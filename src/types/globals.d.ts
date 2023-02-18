declare namespace NodeJS {
    // 環境変数名の定義
    interface ProcessEnv {
      /** 現在の Node.js 実行環境 */
      readonly NODE_ENV: 'development' | 'production' | 'test';
  
      readonly API_URL: string;

      readonly API_KEY:string;

      readonly NEXT_PUBLIC_DOMAIN:string;
    }
  }

