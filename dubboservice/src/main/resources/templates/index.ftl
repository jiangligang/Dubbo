<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:th="http://www.thymeleaf.org"
      xmlns:sec="http://www.thymeleaf.org/thymeleaf-extras-springsecurity3">
<head>
    <meta charset="UTF-8"/>
    <title>Title</title>
    <script src="js/jquery.js"></script>
    <script>
        $(function () {
           alert("ok");
        })
    </script>
</head>


<body>
<div style="height: 100px;width: 100px; background-color: brown" >
    ${email}

</div>
<form action="/common">
    <input type="email" value="${email}">
    用户：<button>thyme</button>
</form>
</body>
</html>