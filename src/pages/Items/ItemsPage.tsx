import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { itemApi } from "../../api/item";
import { useAppSelector } from "../../store/hooks";
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

const ItemsPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const isAdmin = user?.role === 1;

  const [items, setItems] = useState<IItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    try {
      const params: Record<string, string> = {};
      if (filterCategory) params.category = filterCategory;
      if (filterStatus) params.status = filterStatus;
      const data = await itemApi.getItems(params);
      setItems(data);
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  }, [filterCategory, filterStatus]);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const handleStatusChange = async (itemId: string, status: ItemStatus) => {
    try {
      const updated = await itemApi.updateStatus(itemId, status);
      setItems((prev) => prev.map((i) => (i._id === itemId ? updated : i)));
    } catch {
      // silent
    }
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm("Bạn có chắc muốn xóa item này?")) return;
    try {
      await itemApi.deleteItem(itemId);
      setItems((prev) => prev.filter((i) => i._id !== itemId));
    } catch {
      // silent
    }
  };

  const categories = [...new Set(items.map((i) => i.category))];

  const filteredItems = filterPriority
    ? items.filter((i) => i.priority === filterPriority)
    : items;

  const grouped = filteredItems.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, IItem[]>,
  );

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-5 sm:mb-6"
      >
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-surface-800">Danh sách mơ ước của bé</h1>
          <p className="text-sm text-surface-500 mt-0.5">
            {filteredItems.length} item{filteredItems.length !== 1 && "s"}
          </p>
        </div>
        <Link to="/items/new" className="btn-primary text-xs sm:text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
          <span className="hidden sm:inline">Thêm mới</span>
          <span className="sm:hidden">Thêm</span>
        </Link>
      </motion.div>

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

      {/* Content */}
      {loading ? (
        <div className="flex items-center justify-center py-16 sm:py-20">
          <div className="w-6 h-6 border-2 border-primary-200 border-t-primary-500 rounded-full animate-spin" />
        </div>
      ) : filteredItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card text-center py-12 sm:py-16"
        >
          <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 bg-primary-50 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">📋</span>
          </div>
          <p className="text-surface-800 font-semibold mb-1">Chưa có item nào</p>
          <p className="text-sm text-surface-500 mb-5">Bắt đầu thêm những thứ bạn thích!</p>
          <Link to="/items/new" className="btn-primary">Thêm item đầu tiên</Link>
        </motion.div>
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
                  <ItemCard
                    key={item._id}
                    item={item}
                    isAdmin={isAdmin}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </div>
  );
};

function ItemCard({
  item,
  isAdmin,
  onStatusChange,
  onDelete,
}: {
  item: IItem;
  isAdmin: boolean;
  onStatusChange: (id: string, status: ItemStatus) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <motion.div
      layout
      className="card group hover:shadow-elevated transition-all duration-200"
    >
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Status indicator dot */}
        <div className={`mt-1.5 w-2.5 h-2.5 rounded-full flex-shrink-0 ${item.status === "resolve" ? "bg-green-400" :
            item.status === "in_progress" ? "bg-amber-400" : "bg-surface-300"
          }`} />

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start sm:items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-surface-800 text-sm sm:text-[15px]">{item.name}</h3>
            <span className={`badge ${PRIORITY_COLORS[item.priority]}`}>
              {PRIORITY_LABELS[item.priority]}
            </span>
          </div>
          {item.note && (
            <p className="text-xs sm:text-sm text-surface-500 mt-1 line-clamp-2">{item.note}</p>
          )}
          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs text-primary-500 hover:text-primary-600 font-medium"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                Xem link
              </a>
            )}
            {/* Mobile: show status inline */}
            <span className={`badge sm:hidden ${STATUS_COLORS[item.status]}`}>
              {STATUS_LABELS[item.status]}
            </span>
          </div>
        </div>

        {/* Actions — desktop */}
        <div className="hidden sm:flex items-center gap-2 flex-shrink-0">
          {isAdmin ? (
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

          {isAdmin && (
            <button
              type="button"
              onClick={() => onDelete(item._id)}
              className="opacity-0 group-hover:opacity-100 p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
            </button>
          )}
        </div>

        {/* Delete button — mobile (always visible) */}
        {isAdmin && (
          <button
            type="button"
            onClick={() => onDelete(item._id)}
            className="sm:hidden p-1.5 rounded-lg text-surface-400 hover:text-red-500 hover:bg-red-50 transition-all duration-150 flex-shrink-0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default ItemsPage;
