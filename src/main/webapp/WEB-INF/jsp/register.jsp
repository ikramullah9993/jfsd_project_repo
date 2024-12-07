<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Register</title>
</head>
<body>
    <h2>Register</h2>
    <form action="/register" method="post">
        <label for="username">User Name:</label>
        <input type="text" id="username" name="username" required/><br><br>

        <label for="gmail">Gmail:</label>
        <input type="email" id="gmail" name="gmail" required/><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required/><br><br>

        <button type="submit">Register</button>
    </form>
</body>
</html>