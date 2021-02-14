import config from './config';

export default class Data {

  // Helper method for data fetching.
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if(requiresAuth){
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers['Authorization'] = `Basic ${encodedCredentials}`
    }

    return fetch(url, options);
  }

  // GET a single course by id
  async getCourse(courseId, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'GET', null, true, {emailAddress, password});
    if(response.status === 200) {
      return await response.json().then(data => data);
    } else if (response.status === 400 || response.status === 401 || response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // GET all courses
  async getCourses(emailAddress, password) {
    const response = await this.api(`/courses`, 'GET', null, true, {emailAddress, password});
    if(response.status === 200) {
      return response.json().then(data => data);
    } else if (response.status === 400 || response.status === 401 || response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Update an existing course
  async updateCourse(data, emailAddress, password) {
    const response = await this.api(`/courses/${data.id}`, 'PUT', data, true, {emailAddress, password});
    if(response.status === 204) {
      return [];
    } else if (response.status === 400 || response.status === 401 || response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Create a new course
  async createCourse(data, emailAddress, password) {
    const response = await this.api(`/courses`, 'POST', data, true, {emailAddress, password});
    if(response.status === 201) {
      return [];
    } else if (response.status === 400 || response.status === 401 || response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Delete an existing course
  async deleteCourse(courseId, emailAddress, password) {
    const response = await this.api(`/courses/${courseId}`, 'DELETE', null, true, {emailAddress, password});
    if(response.status === 204) {
      return [];
    } else if (response.status === 400 || response.status === 401 || response.status === 403) {
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  // Get the current user
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, {emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
  
  // Create a new user
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }
}
