export interface UserEntity {
  id: string;
  email: string;
  passwordHash: string;
  role: 'candidate' | 'recruiter' | 'employer_admin' | 'moderator' | 'admin' | 'super_admin';
  emailVerifiedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
