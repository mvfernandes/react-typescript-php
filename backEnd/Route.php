<?php
class Route
{

    private static $routes = array();
    private static $pathNotFound = null;
    private static $methodNotAllowed = null;
    private static $baseRoute = "/";

    public static function add($expression, $function, $method = 'get')
    {
        array_push(self::$routes, array(
            'expression' => $expression,
            'function' => $function,
            'method' => $method
        ));
    }
    public static function get($expression, $function)
    {
        self::add($expression, $function, 'get');
    }
    public static function post($expression, $function)
    {
        self::add($expression, $function, 'post');
    }
    public static function put($expression, $function)
    {
        self::add($expression, $function, 'put');
    }
    public static function delete($expression, $function)
    {
        self::add($expression, $function, 'delete');
    }

    public static function pathNotFound($function)
    {
        self::$pathNotFound = $function;
    }

    public static function methodNotAllowed($function)
    {
        self::$methodNotAllowed = $function;
    }
    /**@param mixed $local base local, exemplo: http://localhost/backend/ você insere /backend/ 
     * 
     * @param mixed $prod igual local
    */
    
    public static function ResolvePath($local, $prod) {

        if ($_SERVER['SERVER_NAME'] === 'localhost') {
            self::$baseRoute = $local;
        } else {
            self::$baseRoute =$prod;
        }

    }

    public static function run($basepath = '/')
    {
        $path = "/";
        // print_r($basepath);

        // Parse current url
        $parsed_url = parse_url($_SERVER['REQUEST_URI']); //Parse Uri

        if (isset($parsed_url['path'])) {
            $path = $parsed_url['path'];
        } else {
            $path = '/';
        }

        $path = str_replace(substr($path, 0, strlen(self::$baseRoute)), '/', $path); 

        // Get current request method
        $method = $_SERVER['REQUEST_METHOD'];

        $path_match_found = false;

        $route_match_found = false;

        foreach (self::$routes as $route) {

            // If the method matches check the path

            // Add basepath to matching string
            if ($basepath != '' && $basepath != '/') {
                $route['expression'] = '(' . $basepath . ')' . $route['expression'];
            }

            // Add 'find string start' automatically
            $route['expression'] = '^' . $route['expression'];

            // Add 'find string end' automatically
            $route['expression'] = $route['expression'] . '$';

            // echo $route['expression'].'<br/>';

            // Check path match	
            if (preg_match('#' . $route['expression'] . '#', $path, $matches)) {

                $path_match_found = true;

                // Check method match
                if (strtolower($method) == strtolower($route['method'])) {

                    array_shift($matches); // Always remove first element. This contains the whole string

                    if ($basepath != '' && $basepath != '/') {
                        array_shift($matches); // Remove basepath
                    }

                    call_user_func_array($route['function'], $matches);

                    $route_match_found = true;

                    // Do not check other routes
                    break;
                }
            }
        }

        // No matching route was found
        if (!$route_match_found) {

            // But a matching path exists
            if ($path_match_found) {
                header("HTTP/1.0 405 Method Not Allowed");
                if (self::$methodNotAllowed) {
                    call_user_func_array(self::$methodNotAllowed, array($path, $method));
                }
            } else {
                echo "Não foi possível encontrar sua solicitação";
                return;

                header("HTTP/1.0 404 Not Found");
                if (self::$pathNotFound) {
                    call_user_func_array(self::$pathNotFound, array($path));
                }
            }
        }
    }
}


// Route::get('/users/([0-9]*)', function ($var1) {
//     echo $var1 . ' is a great number!';
// });

// Route::get('/users/([A-z]*)/([A-z]*)', function ($var1, $var2) {
//     echo $var1 . ' is a great !' . $var2;
// });