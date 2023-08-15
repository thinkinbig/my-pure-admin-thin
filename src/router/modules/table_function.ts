export default {
  path: "/functional",
  meta: {
    title: "表单函数",
    icon: "iconamoon:arrow-down-3-square-bold"
  },
  children: [
    {
      path: "/functional/index",
      name: "Functional",
      component: () => import("@/views/functional/index.vue"),
      meta: {
        title: "表单函数"
      }
    }
  ]
};
