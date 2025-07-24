# Axios Instance & Interceptors - Complete Guide

## Table of Contents
- [What is axiosInstance?](#what-is-axiosinstance)
- [Why Use axiosInstance vs Basic Axios?](#why-use-axiosinstance-vs-basic-axios)
- [What are Interceptors?](#what-are-interceptors)
- [Types of Interceptors](#types-of-interceptors)
- [How Interceptors Work](#how-interceptors-work)
- [Real-World Examples](#real-world-examples)
- [Benefits](#benefits)
- [Best Practices](#best-practices)

## What is axiosInstance?

**axiosInstance** is a customized version of axios with pre-configured settings that applies to all requests made with that instance.

```javascript
const axiosInstance = axios.create({
    baseURL: BASE_URL,           // Base URL for all requests
    timeout: 80000,              // Request timeout
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});
```

## Why Use axiosInstance vs Basic Axios?

### ❌ Without axiosInstance (REPETITIVE & ERROR-PRONE)
```javascript
// Every API call needs to repeat the same configuration
const getUser = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        timeout: 80000
    });
    return response.data;
};

const createSession = async (sessionData) => {
    const token = localStorage.getItem('token');
    const response = await axios.post('http://localhost:5000/api/sessions', sessionData, {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        timeout: 80000
    });
    return response.data;
};

// Imagine doing this for 20+ API calls! 😱
```

### ✅ With axiosInstance (CLEAN & MAINTAINABLE)
```javascript
// Simple and consistent
const getUser = async () => {
    const response = await axiosInstance.get('/api/users/profile');
    return response.data;
};

const createSession = async (sessionData) => {
    const response = await axiosInstance.post('/api/sessions', sessionData);
    return response.data;
};
```

## What are Interceptors?

**Interceptors** are functions that Axios calls automatically for **every request or response**. Think of them as "middleware" that sits between your code and the actual HTTP request/response.

```
Your Code → Request Interceptor → HTTP Request → Server
Your Code ← Response Interceptor ← HTTP Response ← Server
```

## Types of Interceptors

### 1. Request Interceptors
- Run **BEFORE** the request is sent to the server
- Modify the request configuration, headers, data, etc.

### 2. Response Interceptors
- Run **AFTER** the response comes back from the server
- Handle responses, errors, transformations, etc.

## How Interceptors Work

### Request Interceptor Flow
```javascript
// 1. You make a request
axiosInstance.get('/api/users');

// 2. Request interceptor runs FIRST (automatically)
axiosInstance.interceptors.request.use(
    (config) => {
        console.log("🚀 Request is about to be sent:", config);
        // Modify config here
        config.headers.Authorization = 'Bearer token123';
        return config; // Must return config
    }
);

// 3. THEN the actual HTTP request goes to server
// GET http://localhost:5000/api/users
// Headers: { Authorization: 'Bearer token123' }
```

### Response Interceptor Flow
```javascript
// 1. Server sends response back
// 2. Response interceptor runs FIRST (automatically)
axiosInstance.interceptors.response.use(
    (response) => {
        console.log("✅ Response received:", response);
        return response; // Must return response
    },
    (error) => {
        console.log("❌ Error occurred:", error);
        return Promise.reject(error);
    }
);

// 3. THEN your code receives the response/error
const data = await axiosInstance.get('/api/users');
```

## Real-World Examples

### 1. Request Interceptor - Automatic Authentication
```javascript
axiosInstance.interceptors.request.use(
    (config) => {
        // This runs BEFORE every request
        const token = localStorage.getItem('token');
        if (token) {
            // Automatically add auth header to EVERY request
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config; // Send modified config to server
    },
    (error) => {
        // Handle request setup errors
        return Promise.reject(error);
    }
);
```

**What happens:**
```javascript
// When you do this:
axiosInstance.get('/api/sessions');

// Interceptor automatically transforms it to:
axiosInstance.get('/api/sessions', {
    headers: {
        Authorization: 'Bearer your-jwt-token-here'
    }
});
```

### 2. Response Interceptor - Global Error Handling
```javascript
axiosInstance.interceptors.response.use(
    (response) => {
        // This runs on successful responses (2xx status codes)
        return response; // Pass response to your code
    },
    (error) => {
        // This runs on error responses (4xx, 5xx status codes)
        if (error.response?.status === 401) {
            // Auto-logout on unauthorized
            localStorage.removeItem('token');
            window.location.href = '/login';
        } else if (error.response?.status === 500) {
            // Log server errors
            console.error("Server error:", error.response.data);
        }
        return Promise.reject(error); // Pass error to your code
    }
);
```

### 3. Loading States
```javascript
// Request interceptor - show loading
axiosInstance.interceptors.request.use((config) => {
    document.getElementById('loading').style.display = 'block';
    return config;
});

// Response interceptor - hide loading
axiosInstance.interceptors.response.use(
    (response) => {
        document.getElementById('loading').style.display = 'none';
        return response;
    },
    (error) => {
        document.getElementById('loading').style.display = 'none';
        return Promise.reject(error);
    }
);
```

### 4. Request Logging
```javascript
axiosInstance.interceptors.request.use((config) => {
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`);
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => {
        console.log(`📥 ${response.status} ${response.config.url}`);
        return response;
    }
);
```

### 5. Token Refresh
```javascript
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            // Try to refresh token
            const newToken = await refreshToken();
            if (newToken) {
                // Retry original request with new token
                error.config.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance.request(error.config);
            }
        }
        return Promise.reject(error);
    }
);
```

### 6. Data Transformation
```javascript
// Request interceptor - transform outgoing data
axiosInstance.interceptors.request.use((config) => {
    if (config.data) {
        // Convert all dates to ISO strings
        config.data = JSON.parse(JSON.stringify(config.data, (key, value) => {
            return value instanceof Date ? value.toISOString() : value;
        }));
    }
    return config;
});

// Response interceptor - transform incoming data
axiosInstance.interceptors.response.use((response) => {
    if (response.data) {
        // Convert ISO strings back to Date objects
        response.data = JSON.parse(JSON.stringify(response.data), (key, value) => {
            return typeof value === 'string' && /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(value) 
                ? new Date(value) : value;
        });
    }
    return response;
});
```

## Multiple Interceptors

You can have **multiple interceptors** of the same type:

```javascript
// First request interceptor
axiosInstance.interceptors.request.use((config) => {
    console.log("1st interceptor");
    config.startTime = Date.now();
    return config;
});

// Second request interceptor
axiosInstance.interceptors.request.use((config) => {
    console.log("2nd interceptor");
    config.headers['X-Custom-Header'] = 'value';
    return config;
});

// They run in the order they were added:
// 1st interceptor → 2nd interceptor → HTTP request
```

## Benefits

### For Interview Prep AI Project:
1. **🔧 Maintainability**: Change base URL once, affects all requests
2. **🔐 Security**: Automatic token attachment, can't forget authentication
3. **⚡ Performance**: Consistent timeouts prevent hanging requests
4. **🚨 Error Handling**: Global error management, better UX
5. **📝 Code Quality**: Less repetition, cleaner code
6. **🔄 Consistency**: All API calls behave the same way
7. **🛠️ Flexibility**: Easy to add/modify interceptors for logging, loading states, etc.

### General Benefits:
- **🔐 Automatic Authentication**: Never forget to add tokens
- **🚨 Global Error Handling**: Consistent error behavior across the app
- **📊 Request Tracking**: Log all API calls for debugging
- **⚡ Performance Monitoring**: Track request/response times
- **🔄 Retry Logic**: Automatically retry failed requests
- **💾 Caching**: Cache responses to reduce server load

## Best Practices

### Key Points to Remember:
- **Must return config/response**: Interceptors must return the config (request) or response
- **Order matters**: Multiple interceptors run in the order they were added
- **Global scope**: Affects ALL requests made with that axios instance
- **Error handling**: Response interceptors can catch and handle errors globally
- **Async operations**: Interceptors can be async functions

### Example Complete Setup:
```javascript
import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 80000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
});

// Request Interceptor - Automatic Authentication
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response Interceptor - Global Error Handling
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if(error.response){
            if (error.response.status === 401) {
                // Redirect to login on unauthorized access
                window.location.href = '/';
            } else if(error.response.status === 500){
                console.error("Server error:", error.response.data);
            } else if(error.code === 'ECONNABORTED') {
                console.error("Request timed out:", error.message);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
```

## Common Interview Questions

### Q: What is the difference between axios and axiosInstance?
**A:** `axios` is the default library instance, while `axiosInstance` is a customized instance created with `axios.create()` that has pre-configured settings like baseURL, headers, and interceptors.

### Q: Why use interceptors instead of writing logic in each API call?
**A:** Interceptors provide:
- **DRY principle** (Don't Repeat Yourself)
- **Centralized logic** for authentication, error handling, logging
- **Automatic execution** for every request/response
- **Easier maintenance** and consistency

### Q: Can you have multiple interceptors?
**A:** Yes, you can add multiple interceptors of the same type. They execute in the order they were added.

### Q: What happens if you don't return config/response in an interceptor?
**A:** The request/response will be undefined, causing the API call to fail.

---

**Remember**: Interceptors are like having a **personal assistant** for your API calls - they handle all the repetitive tasks automatically! 🤖✨
