const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const fs = require('fs');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        publicPath: '/',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader', 'postcss-loader'],
                include: path.resolve(__dirname, 'src'), // فقط ملفات CSS في src
                exclude: /node_modules/, // استثناء node_modules
            },
            {
                test: /\.ttf$/,
                type: 'asset/resource', // استخدام asset/resource بدلاً من file-loader
                generator: {
                    filename: 'fonts/[name][ext]', // الاحتفاظ بالاسم الأصلي
                },
                include: path.resolve(__dirname, 'src/fonts'), // فقط ملفات في src/fonts
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
        }),
        new Dotenv({
            path: path.resolve(__dirname, '.env'), // المسار الكامل لملف .env
            safe: true, // يتحقق من وجود الملف
            allowEmptyValues: true, // السماح بالقيم الفارغة
            systemvars: true, // تحميل متغيرات النظام أيضًا
            silent: false, // إظهار الأخطاء إذا فشل التحميل
          }),
    ],
    devServer: {
        static: [path.join(__dirname, 'dist'),
        path.join(__dirname, 'public'), // تقديم الملفات الثابتة من public
        ],
        historyApiFallback: true,
        port: 443,
        server: {
            type: 'https',
            options: {
                key: fs.readFileSync(path.resolve(__dirname, 'ssl/key.pem')),
                cert: fs.readFileSync(path.resolve(__dirname, 'ssl/cert.pem')),
            },
        },
    },
    mode: 'development',
    stats: {
        // تخصيص الرسائل
        all: false, // تعطيل كل الرسائل افتراضيًا
        errors: true, // إظهار الأخطاء فقط
        warnings: true, // إظهار التحذيرات
        assets: true, // إظهار الأصول (مثل main.[contenthash].js)
        timings: true, // إظهار وقت البناء
        version: false, // إخفاء إصدار Webpack
        hash: false, // إخفاء قيمة hash الكلية
        builtAt: true, // إظهار وقت البناء
        entrypoints: false, // إخفاء تفاصيل نقاط الدخول
        modules: false, // إخفاء تفاصيل الوحدات
    },
};