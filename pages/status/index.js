import useSWR from "swr";

async function fetchAPI(key) {
    const response = await fetch(key);
    const responseBody = await response.json();

    return responseBody;
}

export default function StatusPage() {
    return (
        <>
            <h1>Status</h1>
            <UpdatedAt />

            <h2>Serviços: Banco de Dados</h2>
            <InfoDatabase />
        </>
    );
}

function UpdatedAt() {
    const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
        refreshInterval: 2000,
    });

    let updatedAtText = "Carregando ...";

    if (!isLoading && data) {
        updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
    }
    return <div>Última atualização: {updatedAtText}</div>;
}

function InfoDatabase() {
    const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
        refreshInterval: 2000,
    });

    let versionText = "-";
    let maxConnectionsText = "-";
    let openedConnectionsText = "-";

    if (!isLoading && data) {
        versionText = data.dependencies.database.version;
        maxConnectionsText = data.dependencies.database.max_connections;
        openedConnectionsText = data.dependencies.database.opened_connections;
    }

    return (
        <ul>
            <li>Versão: Postgres {versionText}</li>
            <li>Qtd. de Conexões - Máxima: {maxConnectionsText}</li>
            <li>Qtd. de Conexões - Abertas: {openedConnectionsText}</li>
        </ul>
    );
}
