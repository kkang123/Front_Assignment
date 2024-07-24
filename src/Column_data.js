const getItems = (count = 0, prefix = "") =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: `${prefix}-${k}`,
    content: `${prefix} item ${k}`,
  }));

export const initialColumns = {
  col1: {
    name: "계획 중",
    items: getItems(5, "col1"),
  },
  col2: {
    name: "진행 중",
    items: [],
  },
  col3: {
    name: "완료",
    items: getItems(5, "col3"),
  },
  col4: {
    name: "삭제",
    items: getItems(5, "col4"),
  },
};
