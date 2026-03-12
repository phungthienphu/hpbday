import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { groupApi } from "../../api/group";
import { useAppSelector } from "../../store/hooks";
import type { IGroup } from "../../types/group";

const GroupsPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [groups, setGroups] = useState<IGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState("");
  const [creating, setCreating] = useState(false);

  const fetchGroups = useCallback(async () => {
    setLoading(true);
    try {
      const data = await groupApi.getGroups();
      setGroups(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setCreating(true);
    try {
      const created = await groupApi.createGroup({ name: newName.trim() });
      setGroups((prev) => [created, ...prev]);
      setNewName("");
      setShowCreate(false);
    } catch {
      // silent
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (groupId: string) => {
    if (!confirm("Bạn có chắc muốn xóa nhóm này?")) return;
    try {
      await groupApi.deleteGroup(groupId);
      setGroups((prev) => prev.filter((g) => g._id !== groupId));
    } catch {
      // silent
    }
  };

  const getOwnerName = (group: IGroup) => {
    if (typeof group.createdBy === "string") return "";
    return group.createdBy.name || group.createdBy.username;
  };

  const isOwner = (group: IGroup) => {
    const ownerId =
      typeof group.createdBy === "string"
        ? group.createdBy
        : group.createdBy._id;
    return ownerId === user?._id;
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5 sm:mb-6"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-800">
            Nhóm của tôi
          </h1>
          <p className="text-sm text-surface-500 mt-0.5">
            {groups.length} nhóm
          </p>
        </div>
        <button
          onClick={() => setShowCreate(!showCreate)}
          className="btn-primary text-xs sm:text-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          <span className="hidden sm:inline">Tạo nhóm</span>
          <span className="sm:hidden">Tạo</span>
        </button>
      </motion.div>

      {/* Create form */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form
              onSubmit={handleCreate}
              className="card mb-5 flex flex-col sm:flex-row gap-3"
            >
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="input-field flex-1"
                placeholder="Tên nhóm (VD: Nhóm bạn bè)"
                required
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="btn-primary flex-1 sm:flex-none justify-center disabled:opacity-50"
                >
                  {creating ? "Đang tạo..." : "Tạo"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowCreate(false);
                    setNewName("");
                  }}
                  className="btn-secondary flex-1 sm:flex-none justify-center"
                >
                  Hủy
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16 sm:py-20">
          <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : groups.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center py-12 sm:py-16"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-primary-50 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">👥</span>
          </div>
          <p className="text-surface-800 font-semibold mb-1">
            Chưa có nhóm nào
          </p>
          <p className="text-sm text-surface-500 mb-5">
            Tạo nhóm để chia sẻ wishlist cùng nhau!
          </p>
          <button
            onClick={() => setShowCreate(true)}
            className="btn-primary"
          >
            Tạo nhóm đầu tiên
          </button>
        </motion.div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence>
            {groups.map((group, idx) => (
              <motion.div
                key={group._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * idx }}
                className="card group/card hover:shadow-elevated transition-all duration-200"
              >
                <div className="flex items-center gap-3 sm:gap-4">
                  {/* Icon */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg sm:text-xl">👥</span>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <Link
                      to={`/groups/${group._id}`}
                      className="font-semibold text-surface-800 text-sm sm:text-[15px] hover:text-primary-500 transition-colors"
                    >
                      {group.name}
                    </Link>
                    <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                      <span className="text-xs text-surface-400">
                        {group.members?.length || 0} thành viên
                      </span>
                      {getOwnerName(group) && (
                        <>
                          <span className="text-xs text-surface-300">·</span>
                          <span className="text-xs text-surface-400">
                            Tạo bởi {isOwner(group) ? "bạn" : getOwnerName(group)}
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Members avatars */}
                  <div className="hidden sm:flex -space-x-2">
                    {group.members?.slice(0, 4).map((member) => (
                      <div
                        key={member._id}
                        className="w-7 h-7 rounded-full ring-2 ring-white overflow-hidden"
                        title={member.name || member.username}
                      >
                        {member.avatarUrl ? (
                          <img
                            src={member.avatarUrl}
                            alt={member.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary-300 to-accent-300 flex items-center justify-center text-white text-[10px] font-bold">
                            {(member.name || member.username || "U")
                              .charAt(0)
                              .toUpperCase()}
                          </div>
                        )}
                      </div>
                    ))}
                    {(group.members?.length || 0) > 4 && (
                      <div className="w-7 h-7 rounded-full ring-2 ring-white bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-500">
                        +{group.members.length - 4}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <Link
                      to={`/groups/${group._id}`}
                      className="p-2 rounded-lg text-surface-400 hover:text-primary-500 hover:bg-primary-50 transition-all duration-150"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </Link>
                    {(isOwner(group) || user?.role === 1) && (
                      <button
                        type="button"
                        onClick={() => handleDelete(group._id)}
                        className="p-2 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 opacity-0 group-hover/card:opacity-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="3 6 5 6 21 6" />
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default GroupsPage;
