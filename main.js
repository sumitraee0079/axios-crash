// AXIOS GLOBALS
axios.defaults.headers.common['X-Auth-Token'] = 'someToken';

// GET REQUEST
function getTodos() {
    //console.log('GET Request');
    /*axios({
        method: 'get',
        url: 'https://jsonplaceholder.typeicode.com/todos',
        params: {
            _limit: 5
        }
    })
    .then(res => showOutput(res))
    .catch(err => console.err(err))*/

    axios.get('https://jsonplaceholder.typeicode.com/todos?_limit=5', { timeout: 5000 })
    .then(res => showOutput(res))
    .catch(err => console.err(err))

  }
  
  // POST REQUEST
  function addTodo() {
    //console.log('POST Request');
    /*axios({
        method: 'post',
        url: 'https://jsonplaceholder.typeicode.com/todos',
        data: {
            title: 'New Todo',
            completed: false
        }
    })*/
    axios.post('https://jsonplaceholder.typeicode.com/todos', {
        title: 'New Todo',
        completed: false
    })
    .then(res => showOutput(res))
    .catch(err => console.err(err))
  }
  
  // PUT/PATCH REQUEST
  function updateTodo() {
    // console.log('PUT/PATCH Request');
    //axios.put('https://jsonplaceholder.typeicode.com/todos/1', {
    axios.patch('https://jsonplaceholder.typeicode.com/todos/1', {
        title: 'Updated Todo',
        completed: true
    })
    .then(res => showOutput(res))
    .catch(err => console.err(err))
  }
  
  // DELETE REQUEST
  function removeTodo() {
    // console.log('DELETE Request');
    axios.delete('https://jsonplaceholder.typeicode.com/todos/1')
    .then(res => showOutput(res))
    .catch(err => console.err(err))
  }
  
  // SIMULTANEOUS DATA
  function getData() {
    // console.log('Simultaneous Request');
    axios.all([
        axios.get('https://jsonplaceholder.typeicode.com/todos?_limit=5'),
        axios.get('https://jsonplaceholder.typeicode.com/posts?_limit=5')
    ])
    /*.then(res =>    {
        console.log(res[0]);
        console.log(res[1]);
        showOutput(res[1]);
    }*/

    .then(axios.spread((todos, posts => {
        showOutput(posts)
    })))
    .catch(err => console.error(err))
  }
  
  // CUSTOM HEADERS
  function customHeaders() {
    // console.log('Custom Headers');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorisation': 'sometoken'
        }
    };
    axios.post('https://jsonplaceholder.typeicode.com/todos',
    {
        title: 'New Todo',
        completed: false
    }, config)
    .then(res => showOutput(res))
    .catch(err => console.error(err))
  }
  
  // TRANSFORMING REQUESTS & RESPONSES
  function transformResponse() {
    // console.log('Transform Response');
    const options = {
        method: 'post',
        url: 'https://jsonplaceholder.typeicode.com/todos',
        data: {
            title: 'Hello World',
        },
        transformResponse: axios.defaults.transformResponse.concat(data => {
            data.title = data.title.toUppaerCase()
            return data
        })
    }
    axios(options).then(res => showOutput(res))
  }
  
  // ERROR HANDLING
  function errorHandling() {
    // console.log('Error Handling');
    axios.get('https://jsonplaceholder.typeicode.com/todoss', {
        validateStatus: function(status)    {
            return status < 500 //Reject only if status >= 500
        }
    })
    .then(res => showOutput(res))
    .catch(err => {
        if (err.response)  {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if(err.response.status === 404) {
                    alert('Error: page not found')
                }
            }   else if(err.request) {
                    console.error(err.request)
            }   else{
                    console.error(err.message)
            }
        })
    }
  
  
  // CANCEL TOKEN
  function cancelToken() {
    // console.log('Cancel Token');
    const source = axios.cancelToken.source()
    axios.get('https://jsonplaceholder.typeicode.com/todos', {
        cancelToken: source.token
    })
    .then(res => showOutput(res))
    .catch(thrown => {
        if (axios.isCancel(thrown)) {
            console.log('Request canceled', thrown.message)
        }
    })
    if (true)   {
        source.cancel('Request cancelled')
    }
  }
  
  // INTERCEPTING REQUESTS & RESPONSES
  axios.interceptors.request.use(config =>  {
    console.log(`${config.method.toUppaerCase()} request sent to ${config.url} at ${new Date().getTime()}`)
    return config
  }, error => {
    return Promise.reject(error)
  })
  
  // AXIOS INSTANCES

  const axiosInstance = axios.create({
    baseURL: 'https://jsonplaceholder.typeicode.com'
  })

  axiosInstance.get('/comments').then(res => showOutput(res))
  
  // Show output in browser
  function showOutput(res) {
    document.getElementById('res').innerHTML = `
    <div class="card card-body mb-4">
      <h5>Status: ${res.status}</h5>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Headers
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.headers, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Data
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.data, null, 2)}</pre>
      </div>
    </div>
    <div class="card mt-3">
      <div class="card-header">
        Config
      </div>
      <div class="card-body">
        <pre>${JSON.stringify(res.config, null, 2)}</pre>
      </div>
    </div>
  `;
  }
  
  // Event listeners
  document.getElementById('get').addEventListener('click', getTodos);
  document.getElementById('post').addEventListener('click', addTodo);
  document.getElementById('update').addEventListener('click', updateTodo);
  document.getElementById('delete').addEventListener('click', removeTodo);
  document.getElementById('sim').addEventListener('click', getData);
  document.getElementById('headers').addEventListener('click', customHeaders);
  document
    .getElementById('transform')
    .addEventListener('click', transformResponse);
  document.getElementById('error').addEventListener('click', errorHandling);
  document.getElementById('cancel').addEventListener('click', cancelToken);
