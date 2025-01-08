import {useMemo} from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu";
import {Avatar, AvatarFallback} from "@ui/avatar.tsx";
import {useSessionStore} from "@src/store";

export const MenuProfile = () => {
  const logout = useSessionStore(state => state.logout);
  const name = useSessionStore(state => state.name);

  const initialsOfTheName = useMemo(() => {
    const splitName = name.split(' ');
    const initialName = splitName[0][0];
    return splitName.length <= 1 ? initialName : initialName + splitName[1][0];
  }, [name]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="hover:cursor-pointer">
          <AvatarFallback>{initialsOfTheName}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={console.log} disabled>
            Editar perfil (Proximamente)
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={logout}>
            Cerrar session
          </DropdownMenuItem>
          </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
