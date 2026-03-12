import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { itemApi } from "../../api/item";
import { groupApi } from "../../api/group";
import type { Priority } from "../../types/item";
import { PRIORITY_LABELS } from "../../types/item";
import type { IGroup } from "../../types/group";
import SelectField from "../../components/ui/SelectField";

const ItemForm = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const groupIdFromUrl = searchParams.get("group");

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [link, setLink] = useState("");
  const [note, setNote] = useState("");
  const [groupId, setGroupId] = useState(groupIdFromUrl || "");
  const [groups, setGroups] = useState<IGroup[]>([]);

  const isGroupContext = !!groupIdFromUrl;

  useEffect(() => {
    if (!isGroupContext) {
      groupApi.getGroups().then(setGroups).catch(() => {});
    }
  }, [isGroupContext]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await itemApi.createItem({
        name,
        category,
        priority,
        link,
        note,
        ...(groupId ? { group: groupId } : {}),
      });
      navigate(groupId ? `/groups/${groupId}` : "/items");
    } catch {
      setError("Tạo item thất bại. Vui lòng thử lại.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <button
          type="button"
          onClick={() => navigate(isGroupContext ? `/groups/${groupIdFromUrl}` : "/items")}
          className="btn-ghost text-xs mb-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          Quay lại
        </button>
        <h1 className="text-xl sm:text-2xl font-bold text-surface-800">Thêm món mới</h1>
        <p className="text-sm text-surface-500 mt-0.5">
          {isGroupContext ? "Thêm item vào nhóm" : "Thêm món đồ bạn muốn vào wishlist"}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="card"
      >
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Tên item
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="VD: Áo hoodie đen"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Danh mục
            </label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="input-field"
              placeholder="VD: Thời trang, Ăn uống..."
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Mức độ yêu thích
            </label>
            <SelectField
              value={priority}
              onChange={(v) => setPriority(v as Priority)}
              options={(Object.entries(PRIORITY_LABELS) as [Priority, string][]).map(
                ([value, label]) => ({ value, label }),
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Link tham khảo
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              className="input-field"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-surface-700 mb-1.5">
              Ghi chú
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field min-h-[80px] resize-y"
              placeholder="Thêm ghi chú..."
            />
          </div>

          {!isGroupContext && groups.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-surface-700 mb-1.5">
                Nhóm (tuỳ chọn)
              </label>
              <SelectField
                value={groupId}
                onChange={setGroupId}
                options={groups.map((g) => ({ value: g._id, label: g.name }))}
                placeholder="Đồ cá nhân"
              />
              <p className="text-xs text-surface-400 mt-1">
                Để trống nếu đây là item riêng của bạn
              </p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={saving}
              className="btn-primary flex-1 justify-center disabled:opacity-50"
            >
              {saving ? "Đang tạo..." : "Tạo item"}
            </button>
            <button
              type="button"
              onClick={() => navigate(isGroupContext ? `/groups/${groupIdFromUrl}` : "/items")}
              className="btn-secondary flex-1 justify-center"
            >
              Hủy
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default ItemForm;
