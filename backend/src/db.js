const { Client } = require('pg');

const db = new Client({
  // PostgreSQL Client configuration
    user: process.env.DB_USER || 'postgres',
    host: process.env.DB_HOST || '172.17.0.1',
    database: process.env.DB_NAME || 'postgres',
    password: process.env.DB_PASSWORD || 'admin',
    port: process.env.DB_PORT || 5432,
})

const init = async () => {
  await db.connect();
}

const storeSetup = async (storeJson) => { // Create stores table if it doesn't exist
  //console.log('storeSetup')  
  await db.query(`
      CREATE TABLE IF NOT EXISTS public.stores
      (
          id SERIAL NOT NULL,
          name text,
          url text,
          district text,
          CONSTRAINT stores_pkey PRIMARY KEY (id)
      );
    `);

      // Set the owner of the table to 'postgres'
    await db.query(`
      ALTER TABLE IF EXISTS public.stores OWNER to postgres;
    `);
      // Insert data from storeJson if it's not already present
    for (const store of storeJson) {
          // Check if the store with the same name already exists
      const checkForStore = await db.query(`
        SELECT * FROM public.stores
        WHERE
        name = $1
        LIMIT 1
      `, [store.name]);

      console.log(checkForStore.rows);
    // If the store doesn't exist, insert it into the 'stores' table
      if (checkForStore.rows.length === 0) {
        await db.query(`
          INSERT INTO public.stores (name, url, district)
          VALUES ($1, $2, $3)
        `, [store.name, store.url, store.district]);
      }
    }
  }

  const getAllStores = async() => {
  const res = await db.query('SELECT * FROM public.stores');
  return res.rows;
}

const wellnessSetup = async (wellnessJson) => { // Create stores table if it doesn't exist
  await db.query(`
    CREATE TABLE IF NOT EXISTS public.wellness
    (
        id SERIAL NOT NULL,
        name text,
        url text,
        rating int,
        CONSTRAINT wellness_pkey PRIMARY KEY (id)
    );
  `);

    // Set the owner of the table to 'postgres'
  await db.query(`
    ALTER TABLE IF EXISTS public.wellness OWNER to postgres;
  `);
    // Insert data from storeJson if it's not already present
  for (const item of wellnessJson) {
        // Check if the store with the same name already exists
    const checkForService = await db.query(`
      SELECT * FROM public.wellness
      WHERE
      name = $1
      LIMIT 1
    `, [item.name]);

    console.log(checkForService.rows);
  // If the store doesn't exist, insert it into the 'stores' table
    if (checkForService.rows.length === 0) {
      await db.query(`
        INSERT INTO public.wellness (name, url, rating)
        VALUES ($1, $2, $3)
      `, [item.name, item.url, item.rating]);
    }
  }
}

const getAllWellness = async() => {
  const res = await db.query('SELECT * FROM public.wellness');
  return res.rows;
}
module.exports = {
  storeSetup,
  init,
  getAllStores,
  getAllWellness,
  wellnessSetup
}