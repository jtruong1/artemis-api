# artemis-api

Artemis is an open-source monitoring tool that establishes a single source of truth regarding website health for both users and developers alike.

# Quick Start

Before you begin, make sure you have a MySQL database ready to connect to. You can find detailed instructions on installing MySQL [here](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

1. Clone the repo

   ```sh
   git clone https://github.com/jtruong1/artemis-api.git
   ```

2. Copy the environment file

   ```sh
   cp .env.example .env
   ```

3. Configure `DATABASE_URL` within your `.env` file to point to your MySQL database

   ```sh
   DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
   ```

4. Install NPM packages

   ```sh
   npm install
   ```

5. Migrate and seed the database

   ```sh
   npx prisma migrate dev
   ```

   ```sh
   npx prisma db seed
   ```

5. Start the application

   ```sh
   npm run dev
   ```

In order for mailing to work, you will need to configure the `MAIL_*` environment variables to point to a SMTP server. [Mailgun](https://www.mailgun.com/) provides a free trial to test outgoing emails.

You will need to also follow the instructions for [artemis](https://github.com/jtruong1/artemis) if you haven't already.
