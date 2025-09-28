module.exports = {
  apps: [
    {
      name: "pw-app",
      script: "npm",
      args: "run start -- -p 3000",
      cwd: "/path/to/your/project", // 项目根目录
      env: {
        NODE_ENV: "env"
      }
    }
  ]
}
