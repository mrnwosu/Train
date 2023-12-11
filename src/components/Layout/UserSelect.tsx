import { api } from "~/utils/api";

export function UserSelect({
  onSelect,
}: {
  onSelect: (userId: string) => void;
}) {
  const userData = api.user.getUsers.useQuery({});
  const users = userData.data ?? [];

  return (
    <select
      className=" w-32 text-black"
      name="userSelect"
      defaultValue={"None"}
      onChange={(e) => {
        const select = e.target as HTMLSelectElement;
        onSelect(select.value);
      }}
    >
      <option value="None">None</option>
      {users.map((user) => {
        return (
          <option key={user.id} value={user.id}>
            <p>{user.name}</p>
          </option>
        );
      })}
    </select>
  );
}
