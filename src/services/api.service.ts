import IProduct from "@/types/product";
import IUser from "@/types/user";

export default class FarmAPIHelper {
  resource = "";

  constructor(resource: string) {
    resource;
  }

  API_URL = `https://assessment.farm21.com/${this.resource}`;
  USER = JSON.parse(localStorage.getItem("user"));

  // authentication
  authHeader(): Headers {
    const headers = new Headers({
      "Content-Type": "application/json",
      Accept: "application/json",
    });
    headers.append("Authorization", `Bearer ${this.USER.token}`);

    return headers;
  }

  login(email: string, password: string): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, password }),
    };

    return fetch(`${this.API_URL}api/login`, requestOptions)
      .then(this.handleResponse)
      .then((user) => {
        if (user.token) {
          localStorage.setItem("user", JSON.stringify(user));
        }

        return user;
      });
  }

  logout() {
    const requestOptions = {
      method: "POST",
      headers: this.authHeader(),
    };

    return fetch(`${this.API_URL}api/logout`, requestOptions).then(() => {
      localStorage.clear();
      this.handleResponse;
    });
  }

  getAllProducts(): Promise<IProduct[]> {
    const requestOptions = {
      method: "GET",
      headers: this.authHeader(),
    };

    return fetch(`${this.API_URL}api/products`, requestOptions).then(
      this.handleResponse
    );
  }

  getProductById(id: string): Promise<IProduct> {
    const requestOptions = {
      method: "GET",
      headers: this.authHeader(),
    };

    return fetch(`${this.API_URL}api/products/${id}`, requestOptions).then(
      this.handleResponse
    );
  }

  createNewProduct(body: IProduct): Promise<any> {
    const requestOptions = {
      method: "POST",
      headers: this.authHeader(),
      body: JSON.stringify(body),
    };

    return fetch(`${this.API_URL}api/products`, requestOptions).then(
      this.handleResponse
    );
  }

  deleteProduct(id: number): Promise<any> {
    const requestOptions = {
      method: "DELETE",
      headers: this.authHeader(),
    };

    return fetch(`${this.API_URL}api/products/${id}`, requestOptions).then(
      this.handleResponse
    );
  }

  // Profile management
  getUserData() {
    const requestOptions = {
      method: "GET",
      headers: this.authHeader(),
    };

    return fetch(`${this.API_URL}api/profile`, requestOptions).then(
      this.handleResponse
    );
  }

  updateUserData(body: IUser): Promise<IUser> {
    const requestOptions = {
      method: "PUT",
      headers: this.authHeader(),
      body: JSON.stringify(body),
    };

    return fetch(`${this.API_URL}api/profile`, requestOptions).then(
      this.handleResponse
    );
  }

  private handleResponse(response: Response): Promise<any> {
    return response.text().then((text: string) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }

      return data;
    });
  }
}
