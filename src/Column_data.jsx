const getItems = (count) =>
  Array.from({ length: count }, (_, k) => k).map((k) => ({
    id: `${k}`,
    content: ` item ${k}`,
  }));

export const initialColumns = {
  col1: {
    name: "계획 중",
    items: getItems(5),
  },
  col2: {
    name: "진행 중",
    items: [],
  },
  col3: {
    name: "완료",
    items: [],
  },
  col4: {
    name: "삭제",
    items: [],
  },
};
