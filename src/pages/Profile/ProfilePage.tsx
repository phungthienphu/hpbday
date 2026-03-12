import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateUser } from "../../features/authSlice";
import { userApi } from "../../api/user";
import dayjs from "dayjs";

const ProfilePage = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [birthday, setBirthday] = useState(
    user?.birthday ? dayjs(user.birthday).format("YYYY-MM-DD") : "",
  );
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  if (!user) return null;

  const handleSave = async () => {
    setSaving(true);
    try {
      const updated = await userApi.updateProfile({
        name,
        birthday: birthday || null,
      });
      dispatch(updateUser(updated));
      setIsEditing(false);
    } catch {
      // silent
    } finally {
      setSaving(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const updated = await userApi.uploadAvatar(file);
      dispatch(updateUser(updated));
    } catch {
      // silent
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
      >
        {/* Avatar */}
        <div className="flex flex-col items-center pb-5 sm:pb-6 border-b border-primary-100/60">
          <div className="relative group mb-3 sm:mb-4">
            <div className="w-[72px] h-[72px] sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-br from-primary-300 to-accent-300 ring-4 ring-primary-50 shadow-glow">
              {user.avatarUrl ? (
                <img src={user.avatarUrl} alt={user.name || user.username} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl text-white font-bold">
                  {(user.name || user.username).charAt(0).toUpperCase()}
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute -bottom-1 -right-1 w-7 h-7 bg-gradient-to-br from-primary-400 to-accent-400 text-white rounded-full flex items-center justify-center text-xs shadow-soft hover:shadow-glow transition-all duration-200"
            >
              {uploadingAvatar ? (
                <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
              )}
            </button>
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
          </div>
          <h2 className="text-base sm:text-lg font-bold text-surface-800">{user.name || user.username}</h2>
          <p className="text-sm text-surface-500">@{user.username}</p>
          {user.role === 1 && (
            <span className="mt-2 badge bg-primary-100 text-primary-500">Admin</span>
          )}
        </div>

        {/* Info */}
        <div className="pt-5">
          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Tên hiển thị</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
              </div>
              <div>
                <label className="block text-sm font-medium text-surface-700 mb-1.5">Ngày sinh</label>
                <input type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} className="input-field" />
              </div>
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={handleSave} disabled={saving} className="btn-primary flex-1 justify-center disabled:opacity-50">
                  {saving ? "Đang lưu..." : "Lưu"}
                </button>
                <button type="button" onClick={() => { setIsEditing(false); setName(user.name || ""); setBirthday(user.birthday ? dayjs(user.birthday).format("YYYY-MM-DD") : ""); }} className="btn-secondary flex-1 justify-center">
                  Hủy
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-0">
              <InfoRow label="Tên" value={user.name || "—"} />
              <InfoRow label="Ngày sinh" value={user.birthday ? dayjs(user.birthday).format("DD/MM/YYYY") : "—"} />
              <InfoRow label="Tham gia" value={dayjs(user.createdAt).format("DD/MM/YYYY")} />
              <div className="pt-4">
                <button type="button" onClick={() => setIsEditing(true)} className="btn-secondary w-full justify-center">
                  Chỉnh sửa
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-primary-50 last:border-0">
      <span className="text-sm text-surface-500">{label}</span>
      <span className="text-sm font-medium text-surface-800">{value}</span>
    </div>
  );
}

export default ProfilePage;
