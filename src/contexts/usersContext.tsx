import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/user";

type UsersContextType = {
  users: User[],
  setUsers: React.Dispatch<React.SetStateAction<User[]>>
}

const UsersContext = createContext<UsersContextType>({
  users: [],
  setUsers: () => {}
})

const UsersProvider = ({ children }: { children: ReactNode }) => {

  const [users, setUsers] = useState<User[]>([]);

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  )
}

export {
  UsersContext,
  UsersProvider
}