# Note App Frontend

## Navigation in react apps
1. useNavigate(): Is used inside function. You store it in a variable e.g `const navigate = useNavigate()`
example of useNavigate and Link
```javascript
import {Link, useNavigate} from "react-router-dom"
 const App = () => {
  const navigate = useNavigate()

  const handleSubmit = () => {
    if (condition) {
      navigate('/route')
    }
  }
  return (
    <div>
    Hello world
    <Link to="/route">
    Login
    </Link>
    </div>
  )
 }

```
2. Navigate component: is used inside a component directly e.g <Navigate />
3. Link: use inside jsx


## Read more of DSA (Data Science and Algorith)
- codewars: https://www.codewars.com/
- hackerrank: https://www.hackerrank.com/
