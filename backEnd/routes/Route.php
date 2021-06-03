<?php
class Route
{

  private $routes = array();
  private $pathNotFound = null;
  private $methodNotAllowed = null;
  private $baseRoute = "/";

  public function __construct($local, $prod)
  {

    if ($_SERVER['SERVER_NAME'] === 'localhost') {
      $this->baseRoute = $local;
    } else {
      $this->baseRoute = $prod;
    }
  }

  public function add($expression, $function, $method = 'get')
  {
    array_push($this->routes, array(
      'expression' => $expression,
      'function' => $function,
      'method' => $method
    ));
  }
  public function get($expression, $function)
  {
    $this->add($expression, $function, 'get');
  }
  public function post($expression, $function)
  {
    $this->add($expression, $function, 'post');
  }
  public function put($expression, $function)
  {
    $this->add($expression, $function, 'put');
  }
  public function delete($expression, $function)
  {
    $this->add($expression, $function, 'delete');
  }

  public function pathNotFound($function)
  {
    $this->pathNotFound = $function;
  }

  public function methodNotAllowed($function)
  {
    $this->methodNotAllowed = $function;
  }

  public function run($basepath = '/')
  {
    $path = "/";

    $parsed_url = parse_url($_SERVER['REQUEST_URI']);

    if (isset($parsed_url['path'])) {
      $path = $parsed_url['path'];
    } else {
      $path = '/';
    }

    $path = str_replace(substr($path, 0, strlen($this->baseRoute)), '/', $path);

    $method = $_SERVER['REQUEST_METHOD'];

    $path_match_found = false;

    $route_match_found = false;

    foreach ($this->routes as $route) {

      if ($basepath != '' && $basepath != '/') {
        $route['expression'] = '(' . $basepath . ')' . $route['expression'];
      }

      // Add 'find string start' automatically
      $route['expression'] = '^' . $route['expression'];

      // Add 'find string end' automatically
      $route['expression'] = $route['expression'] . '$';

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
        if ($this->methodNotAllowed) {
          call_user_func_array($this->methodNotAllowed, array($path, $method));
        }
      } else {
        echo "Não foi possível encontrar sua solicitação";
        return;

        header("HTTP/1.0 404 Not Found");
        if ($this->pathNotFound) {
          call_user_func_array($this->pathNotFound, array($path));
        }
      }
    }
  }
}
