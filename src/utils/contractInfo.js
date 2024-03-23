export const contractAddress = "0x1132e127eA13a1B679FDEC2E0DfF61CBBCf06CdF";
// export const contractAddress = "0x32D99caEbaf5eBA340fe8447d8e8f1BD4BfFEc06";

export const contractABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
    ],
    name: "TaskContentEdited",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "content",
        type: "string",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
    ],
    name: "TaskCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "taskId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "completed",
        type: "bool",
      },
    ],
    name: "TaskStatusToggled",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
    ],
    name: "createTask",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_taskId",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_content",
        type: "string",
      },
    ],
    name: "editContent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_taskId",
        type: "uint256",
      },
    ],
    name: "toggleCompleted",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_taskId",
        type: "uint256",
      },
    ],
    name: "getTask",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTasks",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "content",
            type: "string",
          },
          {
            internalType: "bool",
            name: "completed",
            type: "bool",
          },
        ],
        internalType: "struct TodoList.Task[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
