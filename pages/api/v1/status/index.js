import database from "infra/database.js";

async function status(request, response) {
    const updatedAt = new Date().toISOString();
    const databaseVersion = await database.query("SELECT version() as version");
    const databaseConnectionsMax = await database.query("SHOW MAX_CONNECTIONS");
    const databaseConnectionsOpen = await database.query(
        "select count(*) from pg_stat_activity",
    );

    response.status(200).json({
        updated_at: updatedAt,
        database_version: databaseVersion.rows[0].version,
        database_connections_max:
            databaseConnectionsMax.rows[0].max_connections,
        database_connections_open: databaseConnectionsOpen.rowCount,
    });
}

export default status;
