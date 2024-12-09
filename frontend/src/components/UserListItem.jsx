const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="w-full bg-gray-200 hover:bg-teal-500 hover:text-white cursor-pointer px-3 py-2 mb-2 rounded-lg"
    >
      <div>
        <p className="font-medium">{user.name}</p>
        <p className="text-sm text-gray-600">
          <b>Email:</b> {user.email}
        </p>
      </div>
    </div>
  );
};

export default UserListItem;
