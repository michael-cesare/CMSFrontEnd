export const flatNavToTree = (navLinks: any) => {
  const root: any = [];
  const map: any = {};

  navLinks.forEach((node: any) => {
    // No parentId means top level
    if (node.parentRoute === 0) return root.push(node);
    // Insert node as child of parent in flat array
    let parentIndex = map[node.parentRoute];
    if (typeof parentIndex !== 'number') {
      parentIndex = navLinks.findIndex((el: any) => el.id === node.parentRoute);
      map[node.parentRoute] = parentIndex;
    }

    if (!navLinks[parentIndex].children) {
      navLinks[parentIndex].children = [node];

      return [node];
    }

    navLinks[parentIndex].children.push(node);

    return navLinks;
  });

  return root;
};
