const http = require('http');

const PORT = process.env.PORT || 5001;
const BASE_URL = `http://localhost:${PORT}/api`;

const request = (path, method = 'GET', data = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BASE_URL}${path}`);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });

    req.on('error', (err) => reject(err));

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
};

async function runTests() {
  console.log('========================================');
  console.log('🚀 RUNNING COMPREHENSIVE API TEST SUITE');
  console.log('========================================\n');

  let passed = 0;
  let failed = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  try {
    // 0. Health Check
    const health = await request('/health');
    assert(health.status === 200 && health.data.success === true, 'GET /api/health returns 200 OK');

    // 1. Create Employee (Valid)
    const emp1 = {
      name: 'John Doe',
      email: `john.doe.${Date.now()}@example.com`,
      department: 'Engineering',
      designation: 'Senior Backend Engineer',
    };
    const createRes = await request('/employees', 'POST', emp1);
    assert(createRes.status === 201 && createRes.data.success === true, 'POST /api/employees creates employee');
    const createdId = createRes.data.data._id;

    // Create a second employee for search/filter testing
    const emp2 = {
      name: 'Sarah Connor',
      email: `sarah.connor.${Date.now()}@example.com`,
      department: 'Human Resources',
      designation: 'HR Lead',
    };
    const createRes2 = await request('/employees', 'POST', emp2);
    assert(createRes2.status === 201, 'POST /api/employees creates second test employee');

    // 2. Retrieve all employees
    const getAllRes = await request('/employees');
    assert(getAllRes.status === 200 && Array.isArray(getAllRes.data.data), 'GET /api/employees returns array of employees');
    assert(getAllRes.data.count >= 2, `GET /api/employees contains at least 2 records (got ${getAllRes.data.count})`);

    // 3. View employee by ID
    const getByIdRes = await request(`/employees/${createdId}`);
    assert(getByIdRes.status === 200 && getByIdRes.data.data._id === createdId, 'GET /api/employees/:id retrieves single employee');
    assert(getByIdRes.data.data.name === 'John Doe', 'GET /api/employees/:id returns matching name');

    // 4. Update employee
    const updatePayload = {
      name: 'Johnathan Doe',
      designation: 'Staff Backend Engineer',
    };
    const updateRes = await request(`/employees/${createdId}`, 'PUT', updatePayload);
    assert(updateRes.status === 200 && updateRes.data.data.name === 'Johnathan Doe', 'PUT /api/employees/:id updates name');
    assert(updateRes.data.data.designation === 'Staff Backend Engineer', 'PUT /api/employees/:id updates designation');

    // 5. Search by Name
    const searchNameRes = await request('/employees?search=Johnathan');
    assert(searchNameRes.status === 200 && searchNameRes.data.data.some(e => e._id === createdId), 'GET /api/employees?search=name finds matching employee');

    // 6. Search by Email
    const searchEmailRes = await request(`/employees?search=${emp1.email}`);
    assert(searchEmailRes.status === 200 && searchEmailRes.data.data.some(e => e._id === createdId), 'GET /api/employees?search=email finds matching employee');

    // 7. Filter by Department
    const filterDeptRes = await request('/employees?department=Human Resources');
    assert(filterDeptRes.status === 200 && filterDeptRes.data.data.every(e => e.department.toLowerCase() === 'human resources'), 'GET /api/employees?department=HR filters accurately');

    // 8. Search + Filter combined
    const combinedRes = await request(`/employees?search=Sarah&department=Human Resources`);
    assert(combinedRes.status === 200 && combinedRes.data.count >= 1, 'GET /api/employees?search=...&department=... works together');

    // 9. Validation Test: Invalid form submission (empty name, invalid email)
    const invalidRes = await request('/employees', 'POST', {
      name: 'A', // too short
      email: 'not-an-email',
      department: '',
      designation: '',
    });
    assert(invalidRes.status === 400 && invalidRes.data.success === false, 'POST /api/employees with invalid data returns 400 Bad Request');

    // 10. Duplicate Email Check
    const duplicateRes = await request('/employees', 'POST', {
      name: 'Duplicate Guy',
      email: emp2.email,
      department: 'Finance',
      designation: 'Analyst',
    });
    assert(duplicateRes.status === 400 && duplicateRes.data.success === false, 'POST /api/employees with duplicate email returns 400');

    // 11. Invalid Employee ID (Not a valid ObjectId)
    const invalidIdRes = await request('/employees/123-invalid-id');
    assert(invalidIdRes.status === 400 && invalidIdRes.data.success === false, 'GET /api/employees/:invalidId returns 400 Bad Request');

    // 12. Non-existent Employee (Valid ObjectId format, but not in DB)
    const nonExistentRes = await request('/employees/507f1f77bcf86cd799439011');
    assert(nonExistentRes.status === 404 && nonExistentRes.data.success === false, 'GET /api/employees/:nonExistentId returns 404 Not Found');

    // 13. Delete Employee
    const deleteRes = await request(`/employees/${createdId}`, 'DELETE');
    assert(deleteRes.status === 200 && deleteRes.data.success === true, 'DELETE /api/employees/:id deletes employee');

    // 14. Verify deleted employee is gone
    const verifyDeleteRes = await request(`/employees/${createdId}`);
    assert(verifyDeleteRes.status === 404, 'GET /api/employees/:id after delete returns 404 Not Found');

    console.log('\n========================================');
    console.log(`TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
    console.log('========================================');

    if (failed === 0) {
      process.exit(0);
    } else {
      process.exit(1);
    }
  } catch (err) {
    console.error('Test Execution Error:', err);
    process.exit(1);
  }
}

// Execute tests
runTests();
