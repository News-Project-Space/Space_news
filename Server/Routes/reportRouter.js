const express = require('express');
const ReportController = require('../Controllers/reportController');

const router = express.Router();

// الإبلاغ عن تعليق
router.post('/:commentId/report', ReportController.reportComment);

// جلب جميع التقارير (للأدمن)
router.get('/reports', ReportController.getReports);

// التعامل مع التقرير (Soft Delete للتعليق)
router.put('/reports/:reportId/resolve', ReportController.resolveReport);

module.exports = router;