import { ModuleInterface } from './moduleInterface'

module.exports = class HelloWorld implements ModuleInterface {
  name: string;
  description: string;
  version: string;
  settings: Record<string, string>;
  trigger: Array<string>;

  constructor() {
    this.name = "ansjdnakjsd";
    this.description = "asjndkajnsdkjasn ajsndkajsnd";
    this.version = "1.0.0";
    this.settings = {
      "test": "akmsdnmajksndk",
      "moin": "aksndkjansdkjanskdjnaksjdnaksnd"
    }
    this.trigger = [
      "test {query}",
      "moin",
      "test2",
      "waaas",
      "guess this could be a module"
    ]
  }

  query(query: string) {
    return {
        message: "",
      	success: true
    }
  }

  submit() {
    return {
      message: "",
      success: true
    }
  }

  createResultList() {
    return "ajksndkjanskjdnaksjndkajn"
  }
}