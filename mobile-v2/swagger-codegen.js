const { codegen } = require('swagger-axios-codegen');
codegen({
  remoteUrl: 'http://45.154.74.54/api/schema?format=openapi',
  outputDir: './src/shared/http',
  useStaticMethod: true,
  fileName: 'api.ts'
});
