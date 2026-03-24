module.exports = {
   presets: ["babel-preset-expo"],
   plugins: [
      // Suporte a decorators (ex: MobX)
      ["@babel/plugin-proposal-decorators", { legacy: true }],

      // Alias de paths (evita imports relativos longos)
      [
         "module-resolver",
         {
            root: ["./src"],
            alias: {
               "@components": "./src/components",
               "@screens": "./src/screens",
               "@utils": "./src/utils",
            },
         },
      ],

      // Remove console.log em produção
      ...(process.env.NODE_ENV === "production" ? ["transform-remove-console"] : []),

      // Reanimated SEMPRE deve ser o último plugin
      "react-native-reanimated/plugin",
   ],
}
