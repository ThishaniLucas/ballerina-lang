import ballerina/sql;

public function main (string[] args) {
    testSelectWithUntaintedQuery(args);
}

public function testSelectWithUntaintedQuery(string[] args) {
    endpoint sql:Client testDB {
        database: sql:DB.MYSQL,
        host: "localhost",
        port: 3306,
        name: "testdb",
        username: "root",
        password: "root",
        options: {maximumPoolSize:5}
    };

    var dt = testDB -> select("SELECT  FirstName from Customers where registrationID = 1", null, null);
    var closeStatus = testDB -> close();
    return;
}
