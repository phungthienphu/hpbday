import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { groupApi } from "../../api/group";
import { itemApi } from "../../api/item";
import { userApi } from "../../api/user";
import { useAppSelector } from "../../store/hooks";
import type { IGroup, IGroupMember, UserSearchResult } from "../../types/group";
import type { IItem, ItemStatus, Priority } from "../../types/item";
import {
  PRIORITY_LABELS,
  PRIORITY_COLORS,
  STATUS_LABELS,
  STATUS_COLORS,
} from "../../types/item";
import SelectField from "../../components/ui/SelectField";

const STATUS_OPTIONS: ItemStatus[] = ["todo", "in_progress", "resolve"];
const PRIORITY_OPTIONS: Priority[] = ["low", "medium", "high", "very_high"];

const GroupDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);

  const [group, setGroup] = useState<IGroup | null>(null);
  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterCategory, setFilterCategory] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  // Members panel
  const [showMembers, setShowMembers] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<UserSearchResult[]>([]);
  const [searching, setSearching] = useState(false);
  const searchTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const isAdmin = user?.role === 1;
  const isOwner =
    group &&
    (typeof group.createdBy === "string"
      ? group.createdBy === user?._id
      : group.createdBy._id === user?._id);
  const canManage = isOwner || isAdmin;

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    try {
      const [groupData, itemsData] = await Promise.all([
        groupApi.getGroup(id),
        itemApi.getItems({ group: id }),
      ]);
      setGroup(groupData);
      setItems(itemsData);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Debounced user search
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(async () => {
      setSearching(true);
      try {
        const results = await userApi.searchUsers(searchQuery.trim());
        const memberIds = new Set(group?.members?.map((m) => m._id) || []);
        setSearchResults(results.filter((r) => !memberIds.has(r._id)));
      } catch {
        // silent
      } finally {
        setSearching(false);
      }
    }, 400);
    return () => clearTimeout(searchTimerRef.current);
  }, [searchQuery, group?.members]);

  const handleAddMember = async (userId: string) => {
    if (!id) return;
    try {
      const updated = await groupApi.addMember(id, userId);
      setGroup(updated);
      setSearchQuery("");
      setSearchResults([]);
    } catch {
      // silent
    }
  };

  const handleRemoveMember = async (userId: string) => {
    if (!id || !confirm("Xóa thành viên này khỏi nhóm?")) return;
    try {
      await groupApi.removeMember(id, userId);
      setGroup((prev) =>
        prev
          ? { ...prev, members: prev.members.filter((m) => m._id !== userId) }
          : prev,
      );
    } catch {
      // silent
    }
  };

  const handleStatusChange = async (itemId: string, status: ItemStatus) => {
    try {
      const updated = await itemApi.updateStatus(itemId, status);
      setItems((prev) => prev.map((i) => (i._id === itemId ? updated : i)));
    } catch {
      // silent
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    if (!confirm("Xóa item này?")) return;
    try {
      await itemApi.deleteItem(itemId);
      setItems((prev) => prev.filter((i) => i._id !== itemId));
    } catch {
      // silent
    }
  };

  // Filtering
  const categories = [...new Set(items.map((i) => i.category))];
  let filteredItems = items;
  if (filterCategory) filteredItems = filteredItems.filter((i) => i.category === filterCategory);
  if (filterPriority) filteredItems = filteredItems.filter((i) => i.priority === filterPriority);
  if (filterStatus) filteredItems = filteredItems.filter((i) => i.status === filterStatus);

  const grouped = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, IItem[]>,
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-16 sm:py-20">
        <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!group) {
    return (
      <div className="max-w-lg mx-auto text-center py-16">
        <p className="text-surface-500">Không tìm thấy nhóm</p>
        <button onClick={() => navigate("/groups")} className="btn-primary mt-4">
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 sm:mb-6"
      >
        <button
          type="button"
          onClick={() => navigate("/groups")}
          className="btn-ghost text-xs mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Quay lại
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-surface-800">
              {group.name}
            </h1>
            <p className="text-sm text-surface-500 mt-0.5">
              {group.members?.length || 0} thành viên · {items.length} item
            </p>
          </div>
          <div className="flex items-center gap-2">
            {/* Members toggle button */}
            <button
              onClick={() => setShowMembers(!showMembers)}
              className={`btn-ghost text-xs relative ${showMembers ? "!bg-primary-50 !text-primary-600" : ""}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <span className="hidden sm:inline">
                {showMembers ? "Ẩn" : "Thành viên"}
              </span>
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary-400 text-white text-[9px] font-bold flex items-center justify-center">
                {group.members?.length || 0}
              </span>
            </button>
            <Link
              to={`/items/new?group=${id}`}
              className="btn-primary text-xs sm:text-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              <span className="hidden sm:inline">Thêm item</span>
              <span className="sm:hidden">Thêm</span>
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Members panel — collapsible */}
      <AnimatePresence>
        {showMembers && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="card mb-5 sm:mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="section-title">Thành viên</h2>
                {canManage && (
                  <button
                    onClick={() => setShowAddMember(!showAddMember)}
                    className="btn-ghost text-xs"
                  >
                    {showAddMember ? "Đóng" : "+ Thêm"}
                  </button>
                )}
              </div>

              {/* Add member search */}
              <AnimatePresence>
                {showAddMember && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden mb-3"
                  >
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field mb-2"
                      placeholder="Tìm kiếm theo tên hoặc username..."
                      autoFocus
                    />
                    {searching && (
                      <div className="flex items-center gap-2 py-2 px-1">
                        <div className="w-4 h-4 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
                        <span className="text-xs text-surface-400">Đang tìm...</span>
                      </div>
                    )}
                    {searchResults.length > 0 && (
                      <div className="space-y-1 max-h-48 overflow-y-auto">
                        {searchResults.map((result) => (
                          <div
                            key={result._id}
                            className="flex items-center gap-3 p-2 rounded-xl hover:bg-primary-50/50 transition-colors"
                          >
                            <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                              {result.avatarUrl ? (
                                <img src={result.avatarUrl} alt={result.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary-300 to-accent-300 flex items-center justify-center text-white text-xs font-bold">
                                  {(result.name || result.username || "U").charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-surface-800 truncate">{result.name}</p>
                              <p className="text-xs text-surface-400">@{result.username}</p>
                            </div>
                            <button onClick={() => handleAddMember(result._id)} className="btn-primary text-xs !py-1.5 !px-3">
                              Thêm
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                    {searchQuery.trim() && !searching && searchResults.length === 0 && (
                      <p className="text-xs text-surface-400 py-2 px-1">Không tìm thấy người dùng</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Members list */}
              <div className="space-y-1">
                {group.members?.map((member) => (
                  <MemberRow
                    key={member._id}
                    member={member}
                    isCurrentUser={member._id === user?._id}
                    isGroupOwner={
                      typeof group.createdBy === "string"
                        ? group.createdBy === member._id
                        : group.createdBy._id === member._id
                    }
                    canRemove={canManage && member._id !== user?._id}
                    onRemove={() => handleRemoveMember(member._id)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="flex flex-col sm:flex-row gap-2 mb-5 sm:mb-6"
      >
        <SelectField
          value={filterCategory}
          onChange={setFilterCategory}
          options={categories.map((c) => ({ value: c, label: c }))}
          placeholder="Tất cả danh mục"
          className="flex-1"
        />
        <SelectField
          value={filterPriority}
          onChange={setFilterPriority}
          options={PRIORITY_OPTIONS.map((p) => ({ value: p, label: PRIORITY_LABELS[p] }))}
          placeholder="Tất cả mức độ"
          className="flex-1"
        />
        <SelectField
          value={filterStatus}
          onChange={setFilterStatus}
          options={STATUS_OPTIONS.map((s) => ({ value: s, label: STATUS_LABELS[s] }))}
          placeholder="Tất cả trạng thái"
          className="flex-1"
        />
      </motion.div>

      {/* Items section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {filteredItems.length === 0 ? (
          <div className="card text-center py-10">
            <p className="text-surface-500 text-sm mb-3">
              {items.length === 0 ? "Chưa có item nào trong nhóm" : "Không có item phù hợp bộ lọc"}
            </p>
            {items.length === 0 && (
              <Link to={`/items/new?group=${id}`} className="btn-primary text-sm">
                Thêm item đầu tiên
              </Link>
            )}
          </div>
        ) : (
          <AnimatePresence>
            {Object.entries(grouped).map(([category, categoryItems], catIdx) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * (catIdx + 1) }}
                className="mb-6 sm:mb-8"
              >
                <div className="flex items-center gap-3 mb-3 px-1">
                  <h2 className="section-title">{category}</h2>
                  <span className="text-xs text-surface-400">{categoryItems.length}</span>
                  <div className="flex-1 h-px bg-primary-100/60" />
                </div>
                <div className="space-y-2">
                  {categoryItems.map((item) => (
                    <GroupItemCard
                      key={item._id}
                      item={item}
                      canManage={canManage}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </motion.div>
    </div>
  );
};

function MemberRow({
  member,
  isCurrentUser,
  isGroupOwner,
  canRemove,
  onRemove,
}: {
  member: IGroupMember;
  isCurrentUser: boolean;
  isGroupOwner: boolean;
  canRemove: boolean;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-3 py-2 px-1 rounded-xl group/member hover:bg-primary-50/30 transition-colors">
      <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
        {member.avatarUrl ? (
          <img src={member.avatarUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-300 to-accent-300 flex items-center justify-center text-white text-xs font-bold">
            {(member.name || member.username || "U").charAt(0).toUpperCase()}
          </div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-surface-800 truncate">
            {member.name || member.username}
          </p>
          {isCurrentUser && (
            <span className="text-[10px] text-surface-400">(bạn)</span>
          )}
          {isGroupOwner && (
            <span className="badge bg-primary-100 text-primary-500 !text-[10px] !py-0">
              Trưởng nhóm
            </span>
          )}
        </div>
        <p className="text-xs text-surface-400">@{member.username}</p>
      </div>
      {canRemove && (
        <button
          onClick={onRemove}
          className="p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 opacity-0 group-hover/member:opacity-100"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </button>
      )}
    </div>
  );
}

function GroupItemCard({
  item,
  canManage,
  onStatusChange,
  onDelete,
}: {
  item: IItem;
  canManage: boolean;
  onStatusChange: (id: string, status: ItemStatus) => void;
  onDelete: (id: string) => void;
}) {
  const creatorName =
    typeof item.createdBy === "string"
      ? ""
      : item.createdBy.name || item.createdBy.username;

  return (
    <motion.div
      layout
      className="card group/item hover:shadow-elevated transition-all duration-200"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        <div
          className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${
            item.status === "resolve"
              ? "bg-green-400"
              : item.status === "in_progress"
                ? "bg-amber-400"
                : "bg-surface-300"
          }`}
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-surface-800 text-sm sm:text-[15px]">
              {item.name}
            </h3>
            <span className={`badge ${PRIORITY_COLORS[item.priority]}`}>
              {PRIORITY_LABELS[item.priority]}
            </span>
          </div>
          {item.note && (
            <p className="text-xs sm:text-sm text-surface-500 mt-1 line-clamp-2">
              {item.note}
            </p>
          )}
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            {creatorName && (
              <span className="text-xs text-surface-400">bởi {creatorName}</span>
            )}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Xem link
              </a>
            )}
            {canManage ? (
              <select
                value={item.status}
                onChange={(e) => onStatusChange(item._id, e.target.value as ItemStatus)}
                className={`badge sm:hidden cursor-pointer border-0 pr-6 appearance-none bg-no-repeat bg-[right_4px_center] bg-[length:12px] ${STATUS_COLORS[item.status]}`}
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>{STATUS_LABELS[s]}</option>
                ))}
              </select>
            ) : (
              <span className={`badge sm:hidden ${STATUS_COLORS[item.status]}`}>
                {STATUS_LABELS[item.status]}
              </span>
            )}
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          {canManage ? (
            <select
              value={item.status}
              onChange={(e) => onStatusChange(item._id, e.target.value as ItemStatus)}
              className={`badge cursor-pointer border-0 pr-6 appearance-none bg-no-repeat bg-[right_4px_center] bg-[length:12px] ${STATUS_COLORS[item.status]}`}
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")` }}
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s} value={s}>{STATUS_LABELS[s]}</option>
              ))}
            </select>
          ) : (
            <span className={`badge ${STATUS_COLORS[item.status]}`}>
              {STATUS_LABELS[item.status]}
            </span>
          )}
          {canManage && (
            <button
              type="button"
              onClick={() => onDelete(item._id)}
              className="opacity-0 group-hover/item:opacity-100 p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
            </button>
          )}
        </div>

        {canManage && (
          <button
            type="button"
            onClick={() => onDelete(item._id)}
            className="sm:hidden p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default GroupDetail;
