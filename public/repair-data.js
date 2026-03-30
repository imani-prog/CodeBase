// MediLink Login Data Repair Utility
// Run this in browser console to fix any data corruption issues

function repairMediLinkData() {
    console.log('🔧 MediLink Data Repair Utility');
    
    // Get current users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    console.log('📊 Current users before repair:', users);
    
    if (users.length === 0) {
        console.log('ℹ️ No users found. Creating sample users...');
        
        const sampleUsers = [
            { username: 'patient1', password: 'password123', role: 'patient' },
            { username: 'chw1', password: 'password123', role: 'chw' },
            { username: 'admin1', password: 'password123', role: 'admin' }
        ];
        
        localStorage.setItem('users', JSON.stringify(sampleUsers));
        console.log('✅ Sample users created:', sampleUsers);
        return;
    }
    
    // Repair existing users
    let repaired = false;
    const repairedUsers = users.map(user => {
        const originalUser = { ...user };
        
        // Normalize username and password
        if (typeof user.username === 'string') {
            user.username = user.username.trim();
        }
        if (typeof user.password === 'string') {
            user.password = user.password.trim();
        }
        
        // Fix role issues
        if (user.role) {
            const normalizedRole = user.role.toString().trim().toLowerCase();
            
            // Map common variations to correct roles
            if (normalizedRole === 'patient' || normalizedRole === 'patients') {
                user.role = 'patient';
            } else if (normalizedRole === 'chw' || normalizedRole === 'community health worker') {
                user.role = 'chw';
            } else if (normalizedRole === 'admin' || normalizedRole === 'administrator') {
                user.role = 'admin';
            } else {
                console.warn(`⚠️ Unknown role "${user.role}" for user ${user.username}. Setting to 'patient'.`);
                user.role = 'patient';
            }
        } else {
            console.warn(`⚠️ No role found for user ${user.username}. Setting to 'patient'.`);
            user.role = 'patient';
        }
        
        // Check if user was modified
        if (JSON.stringify(originalUser) !== JSON.stringify(user)) {
            repaired = true;
            console.log(`🔧 Repaired user: ${originalUser.username}`);
            console.log('   Before:', originalUser);
            console.log('   After:', user);
        }
        
        return user;
    });
    
    if (repaired) {
        localStorage.setItem('users', JSON.stringify(repairedUsers));
        console.log('✅ Data repair completed. Updated users saved.');
    } else {
        console.log('✅ No repairs needed. All user data is clean.');
    }
    
    console.log('📊 Final users:', repairedUsers);
    
    return repairedUsers;
}

function testLogin(username, password, role) {
    console.log(`🧪 Testing login for ${username} with role ${role}`);
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find(u => u.username === username && u.password === password);
    
    if (!found) {
        console.log('❌ User not found or wrong credentials');
        return false;
    }
    
    console.log('👤 Found user:', found);
    
    if (found.role !== role) {
        console.log(`❌ Role mismatch: registered as "${found.role}", trying to login as "${role}"`);
        return false;
    }
    
    console.log('✅ Login test successful!');
    return true;
}

function clearAllUsers() {
    localStorage.removeItem('users');
    console.log('🗑️ All users cleared from localStorage');
}

// Auto-run repair on load
console.log('🚀 MediLink Data Repair Utility loaded. Available functions:');
console.log('- repairMediLinkData(): Fix data corruption issues');
console.log('- testLogin(username, password, role): Test login functionality');
console.log('- clearAllUsers(): Clear all user data');
console.log('');
console.log('Running automatic data check...');
repairMediLinkData();

export { repairMediLinkData, testLogin, clearAllUsers };