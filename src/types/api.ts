export type Priority = "low" | "medium" | "high";

export type CategoryDTO = {
  id: string;
  label: string;
  emoji: string;
  productCount?: number;
};

export type StoreDTO = {
  id: string;
  name: string;
  website: string;
};

export type ProductDTO = {
  id: string;
  title: string;
  brand: string;
  description: string;
  price: number; // копейки
  originalPrice: number | null;
  currency: string;
  image: string;
  color: string | null;
  tags: string[];
  storeUrl: string;
  category: CategoryDTO;
  store: StoreDTO;
  createdAt: string;
  savedByCount?: number;
};

export type UserDTO = {
  id: string;
  name: string;
  handle: string;
  avatar: string | null;
  bio: string;
  color: string;
  birthday: string | null; // ISO или null
  isMe: boolean;
  lastActive: string;
};

export type FriendSummaryDTO = UserDTO & {
  wishCount: number;
  previewImages: string[];
};

export type WishItemDTO = {
  id: string;
  product: ProductDTO;
  priority: Priority;
  note: string | null;
  addedAt: string;
};

export type ActivityEventDTO = {
  id: string;
  user: UserDTO;
  product: ProductDTO;
  when: string;
};

export type ListResponse<T> = {
  total: number;
  items: T[];
};

export type ProductQuery = {
  q?: string;
  category?: string;
  store?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "trending" | "priceAsc" | "priceDesc" | "new";
  limit?: number;
  offset?: number;
};
