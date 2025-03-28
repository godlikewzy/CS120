<!doctype html>
<html>
<head>
<title>problem 1</title>
</head>

<body>
<?php
header('Content-Type: application/json');

if (is_numeric($_GET['n'])) {
    $n = (int) $_GET['n'];
    
    $fibo = [];
    if ($n >= 1) $fibo[] = 0;
    if ($n >= 2) $fibo[] = 1;
    for ($i = 2; $i < $n; $i++) {
        $fibo[] = $fibo[$i - 1] + $fibo[$i - 2];
    }

    $result = [
        'length' => $n,
        'fibSequence' => $fibo
    ];
} 
else {
    $result = [
        'error' => "Missing or invalid 'n' parameter."
    ];
}

echo json_encode($result);
?>
</body>
</html>
