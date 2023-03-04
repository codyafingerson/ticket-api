<header>
    <h1>Operation Ticket Management API</h1>
</header>
<hr />
<h2>Getting Started</h2>
<ol>
    <li>Clone the repository</li>
    <li>Run <code>npm install</code> to install the required dependencies</li>
    <li>Run <code>npm start</code> to start the application</li>
    <li>Run <code>npm run dev</code> to start the application in development mode (compiles & runs application after
        source changes)</li>
</ol>

<hr />
<h2>Testing</h2>
<sup>** Please note this has yet to be implemented</sup>
<p>Run <code>npm test</code> to run the test suite</p>

<hr />

<h2>API Documentation</h2>

<h3>Authentication</h3>
<p>Authentication is done using JWT tokens. To get a token, make a POST request to
    <code>https://localhost:{YOUR_PORT}/api/auth/login</code> with the following payload</p>
<sub>
    <p>Keys annotated with * are required</p>
</sub>
<pre>
{
      "isAdmin": null,
    * "firstname": "John",
    * "lastname": "Doe",
    * "username": "johndoe",
      "email": "jdoe@exmaple.com"
    * "password": "1234"
}
</pre>

<h4>Commands available in this application</h4>
<table>
    <thead>
        <tr>
            <th>Command</th>
            <th>Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><code>npm install</code></td>
            <td>Install required dependencies for the application</td>
        </tr>
    </tbody>
</table>