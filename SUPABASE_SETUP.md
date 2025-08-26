# Setup Supabase untuk PinPod Website

## Langkah 1: Buat Project Supabase

1. Kunjungi [supabase.com](https://supabase.com)
2. Klik "Start your project"
3. Login dengan GitHub atau buat akun baru
4. Klik "New Project"
5. Pilih organization atau buat baru
6. Isi detail project:
   - **Name**: `pinpod-website`
   - **Database Password**: Buat password yang kuat
   - **Region**: Pilih region terdekat (Asia Southeast)
7. Klik "Create new project"
8. Tunggu setup selesai (2-3 menit)

## Langkah 2: Setup Database

1. Di dashboard Supabase, klik **"SQL Editor"** di sidebar
2. Klik **"New query"**
3. Copy dan paste isi file `supabase-setup.sql`
4. Klik **"Run"** untuk menjalankan script
5. Verifikasi tables sudah dibuat di **"Table Editor"**

## Langkah 3: Dapatkan API Keys

1. Di dashboard Supabase, klik **"Settings"** di sidebar
2. Klik **"API"**
3. Copy **Project URL** dan **anon public** key
4. Update file `supabase-config.js`:

```javascript
const SUPABASE_URL = 'https://your-project-id.supabase.co'
const SUPABASE_ANON_KEY = 'your-anon-key-here'
```

## Langkah 4: Test Koneksi

1. Buka website di localhost
2. Buka Developer Tools (F12)
3. Coba submit form pendaftaran
4. Cek di **"Table Editor"** > **"users"** apakah data masuk
5. Cek di **"Table Editor"** > **"analytics"** apakah event tracking berfungsi

## Langkah 5: Setup Row Level Security (RLS)

RLS sudah di-setup otomatis melalui script SQL, tapi Anda bisa customize:

1. Di **"Authentication"** > **"Policies"**
2. Review dan edit policies sesuai kebutuhan
3. Test dengan user berbeda

## Langkah 6: Monitoring dan Analytics

### View Data Users:
```sql
SELECT * FROM user_stats;
```

### View Analytics:
```sql
SELECT * FROM analytics_summary;
```

### Real-time Monitoring:
1. Di dashboard, klik **"Logs"**
2. Monitor API calls dan errors
3. Setup alerts jika diperlukan

## Langkah 7: Environment Variables

Untuk production, gunakan environment variables:

```javascript
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY
```

## Troubleshooting

### Error: "Invalid API key"
- Pastikan URL dan key sudah benar
- Cek apakah project masih aktif
- Verifikasi RLS policies

### Error: "Table doesn't exist"
- Jalankan ulang script SQL
- Cek nama table di Table Editor
- Pastikan schema adalah `public`

### Form tidak submit
- Cek console browser untuk error
- Verifikasi Supabase client sudah load
- Test koneksi internet

### Analytics tidak track
- Cek RLS policies untuk table analytics
- Verifikasi event data format
- Monitor di Logs dashboard

## Security Best Practices

1. **Never expose service_role key** di frontend
2. **Use RLS policies** untuk data protection
3. **Validate input** di frontend dan backend
4. **Monitor API usage** secara regular
5. **Backup database** secara berkala

## Performance Optimization

1. **Use indexes** untuk query yang sering
2. **Limit data** yang di-fetch
3. **Cache responses** jika diperlukan
4. **Monitor query performance**

## Next Steps

1. Setup authentication system
2. Add user dashboard
3. Implement real-time features
4. Add email notifications
5. Setup backup strategy

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Community](https://github.com/supabase/supabase/discussions)
- [PinPod Project Issues](https://github.com/btcbid/pp/issues)
