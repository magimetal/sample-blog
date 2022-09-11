export interface BlogPost {
  id: string;
  text: string;
  timestamp: string;
  title: string;
}

export interface BlogApiGetResponseMulti {
  response: BlogPost[];
}

export interface BlogApiGetResponseSingle {
  response: BlogPost;
}

export interface BlogApiPutResponse {
  response: string;
}
