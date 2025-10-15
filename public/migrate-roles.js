// MediLink Role Migration Script
// This script normalizes "client" roles to "patient" in localStorage

function migrateClientToPatient() {
    console.log('🔄 Starting MediLink role migration...');
    
    try {
        // Get current users from localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        if (users.length === 0) {
            console.log('ℹ️ No users found in localStorage');
            return;
        }
        
        console.log('📊 Users before migration:', users);
        
        let migratedCount = 0;
        
        // Update any "client" roles to "patient"
        const updatedUsers = users.map(user => {
            if (user.role && (user.role.toLowerCase() === 'client' || user.role.toLowerCase().trim() === 'client')) {
                console.log(`🔄 Migrating user "${user.username}" from "client" to "patient"`);
                migratedCount++;
                return {
                    ...user,
                    role: 'patient'
                };
            }
            return user;
        });
        
        if (migratedCount > 0) {
            // Save updated users back to localStorage
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            console.log(`✅ Migration completed! ${migratedCount} user(s) migrated from "client" to "patient"`);
            console.log('📊 Users after migration:', updatedUsers);
        } else {
            console.log('ℹ️ No migration needed - no "client" roles found');
        }
        
        return updatedUsers;
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
        return null;
    }
}

// Auto-run migration when script is loaded
console.log('🚀 MediLink Role Migration Script loaded');
migrateClientToPatient();

// Also make the function available globally for manual use
window.migrateClientToPatient = migrateClientToPatient;