// import React, { useState, useCallback } from "react";
// import { DragDropContext } from "react-beautiful-dnd";
// import DroppableColumn from "./components/DroppableColumn";
// import { initialColumns } from "./Column_data";

// const App = () => {
//   const [columns, setColumns] = useState(initialColumns);
//   const [nextItemId, setNextItemId] = useState(5);
//   const [draggedItem, setDraggedItem] = useState(null);
//   const [selectedItems, setSelectedItems] = useState([]);

//   const isEven = (itemId) => {
//     if (!itemId) return false;
//     const itemNumber = parseInt(itemId, 10);
//     return itemNumber % 2 === 0;
//   };

//   const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);
//     return result;
//   };

//   const onDragStart = useCallback((start) => {
//     const { draggableId } = start;
//     setDraggedItem(draggableId);
//   }, []);

//   const onDragEnd = useCallback(
//     (result) => {
//       const { source, destination } = result;
//       setDraggedItem(null);

//       if (!destination) {
//         return;
//       }

//       // 첫 번째 컬럼에서 세 번째 컬럼으로의 이동을 막음
//       if (source.droppableId === "col1" && destination.droppableId === "col3") {
//         return;
//       }

//       const sourceCol = columns[source.droppableId];
//       const destCol = columns[destination.droppableId];
//       const draggedItemId = draggedItem;
//       const draggedItemIsEven = isEven(draggedItemId);

//       // 목적지 컬럼에 이미 짝수 아이템이 있는지 확인
//       const destContainsEvenItem = destCol.items.some((item) =>
//         isEven(item.id)
//       );

//       // 짝수 아이템이 짝수 아이템이 있는 컬럼으로 이동할 수 없도록 함
//       if (draggedItemIsEven && destContainsEvenItem) {
//         return;
//       }

//       let itemsToMove;
//       if (selectedItems.length) {
//         itemsToMove = selectedItems.map((itemId) =>
//           sourceCol.items.find((item) => item.id === itemId)
//         );
//       } else {
//         itemsToMove = [draggedItem].map((itemId) =>
//           sourceCol.items.find((item) => item.id === itemId)
//         );
//       }

//       const sourceItems = Array.from(sourceCol.items);
//       const destItems = Array.from(destCol.items);

//       if (source.droppableId === destination.droppableId) {
//         const newItems = reorder(sourceItems, source.index, destination.index);
//         setColumns((prevColumns) => ({
//           ...prevColumns,
//           [source.droppableId]: {
//             ...sourceCol,
//             items: newItems,
//           },
//         }));
//       } else {
//         itemsToMove.forEach((item) => {
//           const itemIndex = sourceItems.findIndex((i) => i.id === item.id);
//           sourceItems.splice(itemIndex, 1);
//         });

//         let destinationIndex = destination.index;

//         itemsToMove.forEach((item) => {
//           if (destinationIndex > destItems.length) {
//             destinationIndex = destItems.length;
//           }
//           destItems.splice(destinationIndex, 0, item);
//           destinationIndex++;
//         });

//         setColumns((prevColumns) => ({
//           ...prevColumns,
//           [source.droppableId]: {
//             ...sourceCol,
//             items: sourceItems,
//           },
//           [destination.droppableId]: {
//             ...destCol,
//             items: destItems,
//           },
//         }));
//       }

//       setSelectedItems([]);
//     },
//     [columns, draggedItem, selectedItems]
//   );

//   const addItemToColumn = () => {
//     const newItem = {
//       id: `${nextItemId}`,
//       content: `item ${nextItemId}`,
//     };

//     setColumns((prevColumns) => ({
//       ...prevColumns,
//       col1: {
//         ...prevColumns.col1,
//         items: [...prevColumns.col1.items, newItem],
//       },
//     }));

//     setNextItemId((prevId) => prevId + 1);
//   };

//   const getItemStyle = (isDragging, draggableId, source, destination) => {
//     let bgColor = "bg-gray-300";

//     if (isDragging) {
//       bgColor = "bg-green-200";
//     }

//     if (draggedItem === draggableId) {
//       if (
//         !destination ||
//         (source.droppableId === "col1" && destination === "col3")
//       ) {
//         bgColor = "bg-red-300";
//       }
//     }

//     return `p-4 mb-2 rounded ${bgColor}`;
//   };

//   const getListStyle = (isDraggingOver) =>
//     `p-4 ${isDraggingOver ? "bg-blue-100" : "bg-gray-200"} w-64`;

//   const handleItemSelect = (itemId) => {
//     setSelectedItems((prevSelectedItems) =>
//       prevSelectedItems.includes(itemId)
//         ? prevSelectedItems.filter((id) => id !== itemId)
//         : [...prevSelectedItems, itemId]
//     );
//   };

//   return (
//     <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
//       <div className="flex gap-4 p-4 m-4 overflow-x-auto max-w-full">
//         <div className="flex space-x-4">
//           {Object.entries(columns).map(([colId, colData]) => (
//             <DroppableColumn
//               key={colId}
//               columnId={colId}
//               columnData={colData}
//               getListStyle={getListStyle}
//               getItemStyle={(isDragging, draggableId, source, destination) =>
//                 getItemStyle(isDragging, draggableId, source, destination)
//               }
//               addItem={colId === "col1" ? addItemToColumn : undefined}
//               selectedItems={selectedItems}
//               onItemSelect={handleItemSelect}
//             />
//           ))}
//         </div>
//       </div>
//     </DragDropContext>
//   );
// };

// export default App;

import React, { useState, useCallback } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import DroppableColumn from "./components/DroppableColumn";
import { initialColumns } from "./Column_data";

const App = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [nextItemId, setNextItemId] = useState(5);
  const [draggedItem, setDraggedItem] = useState(null);
  const [selectedItems, setSelectedItems] = useState([]);

  const isEven = (itemId) => {
    if (!itemId) return false;
    const itemNumber = parseInt(itemId, 10);
    return itemNumber % 2 === 0;
  };

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const onDragStart = useCallback((start) => {
    const { draggableId } = start;
    setDraggedItem(draggableId);
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination } = result;
      setDraggedItem(null);

      if (!destination) {
        return;
      }

      if (source.droppableId === "col1" && destination.droppableId === "col3") {
        return;
      }

      const sourceCol = columns[source.droppableId];
      const destCol = columns[destination.droppableId];
      const draggedItemId = draggedItem;
      const draggedItemIsEven = isEven(draggedItemId);

      const destContainsEvenItem = destCol.items.some((item) =>
        isEven(item.id)
      );

      if (draggedItemIsEven && destContainsEvenItem) {
        return;
      }

      let itemsToMove;
      if (selectedItems.length) {
        itemsToMove = selectedItems.map((itemId) =>
          sourceCol.items.find((item) => item.id === itemId)
        );
      } else {
        itemsToMove = [draggedItem].map((itemId) =>
          sourceCol.items.find((item) => item.id === itemId)
        );
      }

      const sourceItems = Array.from(sourceCol.items);
      const destItems = Array.from(destCol.items);

      if (source.droppableId === destination.droppableId) {
        const newItems = reorder(sourceItems, source.index, destination.index);
        setColumns((prevColumns) => ({
          ...prevColumns,
          [source.droppableId]: {
            ...sourceCol,
            items: newItems,
          },
        }));
      } else {
        itemsToMove.forEach((item) => {
          const itemIndex = sourceItems.findIndex((i) => i.id === item.id);
          sourceItems.splice(itemIndex, 1);
        });

        let destinationIndex = destination.index;

        itemsToMove.forEach((item) => {
          if (destinationIndex > destItems.length) {
            destinationIndex = destItems.length;
          }
          destItems.splice(destinationIndex, 0, item);
          destinationIndex++;
        });

        setColumns((prevColumns) => ({
          ...prevColumns,
          [source.droppableId]: {
            ...sourceCol,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destCol,
            items: destItems,
          },
        }));
      }

      setSelectedItems([]);
    },
    [columns, draggedItem, selectedItems]
  );

  const addItemToColumn = () => {
    const newItem = {
      id: `${nextItemId}`,
      content: `item ${nextItemId}`,
    };

    setColumns((prevColumns) => ({
      ...prevColumns,
      col1: {
        ...prevColumns.col1,
        items: [...prevColumns.col1.items, newItem],
      },
    }));

    setNextItemId((prevId) => prevId + 1);
  };

  const handleDeleteItem = (itemId) => {
    setColumns((prevColumns) => {
      const col4Items = prevColumns.col4.items;
      const updatedCol4Items = col4Items.filter((item) => item.id !== itemId);

      return {
        ...prevColumns,
        col4: {
          ...prevColumns.col4,
          items: updatedCol4Items,
        },
      };
    });
  };

  const getItemStyle = (isDragging, draggableId, source, destination) => {
    let bgColor = "bg-gray-300";

    if (isDragging) {
      bgColor = "bg-green-200";
    }

    if (draggedItem === draggableId) {
      if (
        !destination ||
        (source.droppableId === "col1" && destination.droppableId === "col3")
      ) {
        bgColor = "bg-red-300";
      }
    }

    return `p-4 mb-2 rounded ${bgColor}`;
  };

  const getListStyle = (isDraggingOver) =>
    `p-4 ${isDraggingOver ? "bg-blue-100" : "bg-gray-200"} w-64`;

  const handleItemSelect = (itemId) => {
    setSelectedItems((prevSelectedItems) =>
      prevSelectedItems.includes(itemId)
        ? prevSelectedItems.filter((id) => id !== itemId)
        : [...prevSelectedItems, itemId]
    );
  };

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className="flex gap-4 p-4 m-4 overflow-x-auto max-w-full">
        <div className="flex space-x-4">
          {Object.entries(columns).map(([colId, colData]) => (
            <DroppableColumn
              key={colId}
              columnId={colId}
              columnData={colData}
              getListStyle={getListStyle}
              getItemStyle={(isDragging, draggableId, source, destination) =>
                getItemStyle(isDragging, draggableId, source, destination)
              }
              addItem={colId === "col1" ? addItemToColumn : undefined}
              selectedItems={selectedItems}
              onItemSelect={handleItemSelect}
              handleDeleteItem={handleDeleteItem} // 삭제 핸들러 전달
            />
          ))}
        </div>
      </div>
    </DragDropContext>
  );
};

export default App;
