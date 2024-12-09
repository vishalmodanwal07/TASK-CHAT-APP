const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
      <div
        className="inline-flex items-center px-2 py-1 rounded-lg bg-purple-500 text-white text-xs font-medium m-1 mb-2 cursor-pointer"
        onClick={handleFunction}
      >
        {user.name}
        {admin === user._id && <span className="ml-1">(Admin)</span>}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="ml-2 w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </div>
    );
  };
  
  export default UserBadgeItem;
  