module.exports = {
  async rewrites() {
    return [
      {
        source: "/city/:any*",
        destination: "/city",
      },
    ];
  },
};
