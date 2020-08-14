const gluesql = import('gluesql');

async function main() {
  const { Glue } = await gluesql;

  const sqls = [`
    CREATE TABLE Test (
        id INTEGER,
        msg TEXT,
        flag BOOLEAN
    );`,
    "INSERT INTO Test (id, msg, flag) VALUES (1, \"Hello GlueSQL\", false);",
    "INSERT INTO Test (id, msg, flag) VALUES (2, \"Good Luck!\", true);",
    "SELECT * FROM Test WHERE id > 0;",
  ];


  const db = new Glue("memory");
  /* other options:
   *
   * const db = new Glue("localstorage", "database-name");
   * const db = new Glue("sessionstorage", "database-name");
   */

  for (sql of sqls) {
    print('[RUN]', sql);

    const result = db.execute(sql)[0];
    print('[RESULT]', result);
  }
}

function print(title, content) {
  const code = document.createElement('code');

  code.style.display = 'block';
  code.textContent = `${title}\t${JSON.stringify(content, null, ' ')}`;

  console.log(title, content);
  document.body.appendChild(code);
}

main();
