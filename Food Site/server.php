<?php
$_POST = json_decode(file_get_contents("php://input"), true); // позволяет php работать с форматом json
echo var_dump($_POST); // берет данные с клиента, делает из них  строку и показывает