module.exports = {
  apps: [
    {
      name: "doodledrip",
      cwd: "/home/deploy/doodledrip/run",
      script: "server.js",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3331,
        HOSTNAME: "0.0.0.0",
      },
      max_memory_restart: "450M",
      exp_backoff_restart_delay: 2000,
      max_restarts: 10,
    },
  ],
};
