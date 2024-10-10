test("Get to /api/v1/status should return 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();

    expect(responseBody.updated_at).toBeDefined();
    expect(responseBody.database_version).toBeDefined();
    expect(responseBody.database_connections_max).toBeDefined();
    expect(responseBody.database_connections_open).toBeDefined();

    const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
    const parsedDatabaseConnectionsMax = new Number(
        responseBody.database_connections_max,
    ).toString();
    const parsedDatabaseConnectionsOpen = parseInt(
        responseBody.database_connections_open,
    );

    expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
    expect(responseBody.database_version.includes("PostgreSQL")).toBe(true);
    expect(responseBody.database_connections_max).toEqual(
        parsedDatabaseConnectionsMax,
    );
    expect(responseBody.database_connections_open).toEqual(
        parsedDatabaseConnectionsOpen,
    );
});
