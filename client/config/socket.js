import { io } from "socket.io-client";
import baseUrl from "./server";

const socket = io(baseUrl);
export default socket;
