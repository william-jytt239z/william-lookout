#!/usr/bin/env pwsh
<#
.SYNOPSIS
    自动重试 Git 推送脚本
.DESCRIPTION
    尝试推送代码到 GitHub，如果失败则等待 5 分钟后重试
    最多重试 12 次（总共约 1 小时）
#>

$maxRetries = 12
$retryInterval = 300  # 5 分钟（秒）
$retryCount = 0
$success = $false

# 设置工作目录
$repoPath = "C:\Users\t2390\.openclaw\workspace\agent-nicole\projects\william-lookout"
Set-Location $repoPath

# 检查是否有未推送的提交
$unpushedCommits = git log origin/main..master --oneline 2>$null
if (-not $unpushedCommits) {
    Write-Host "✅ 没有未推送的提交，无需重试" -ForegroundColor Green
    exit 0
}

Write-Host "🚀 开始自动重推机制..." -ForegroundColor Cyan
Write-Host "📦 未推送提交数: $($unpushedCommits.Count)" -ForegroundColor Yellow
Write-Host "⏱️  最大重试次数: $maxRetries 次（间隔 5 分钟）" -ForegroundColor Gray
Write-Host ""

while ($retryCount -lt $maxRetries -and -not $success) {
    $retryCount++
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    
    Write-Host "[$timestamp] 第 $retryCount 次尝试推送..." -ForegroundColor Cyan
    
    try {
        # 尝试推送
        $output = git push origin master:main 2>&1
        $exitCode = $LASTEXITCODE
        
        if ($exitCode -eq 0) {
            Write-Host "✅ 推送成功！" -ForegroundColor Green
            $success = $true
            
            # 记录成功日志
            "$timestamp - 推送成功（第 $retryCount 次尝试）" | Out-File -Append -FilePath "$repoPath\logs\push-retry.log"
        } else {
            throw $output
        }
    } catch {
        Write-Host "❌ 推送失败: $_" -ForegroundColor Red
        
        # 记录失败日志
        "$timestamp - 推送失败（第 $retryCount 次）: $_" | Out-File -Append -FilePath "$repoPath\logs\push-retry.log"
        
        if ($retryCount -lt $maxRetries) {
            Write-Host "⏳ 等待 5 分钟后重试..." -ForegroundColor Yellow
            Start-Sleep -Seconds $retryInterval
        } else {
            Write-Host "🛑 已达到最大重试次数 ($maxRetries 次)，停止重试" -ForegroundColor Red
            
            # 发送失败通知（可以通过邮件或其他方式）
            "$timestamp - 连续 $maxRetries 次推送失败，已停止重试" | Out-File -Append -FilePath "$repoPath\logs\push-retry.log"
            
            exit 1
        }
    }
}

if ($success) {
    Write-Host ""
    Write-Host "🎉 代码已成功推送到 GitHub！" -ForegroundColor Green
    Write-Host "🌐 Vercel 将自动重新部署" -ForegroundColor Cyan
    exit 0
} else {
    exit 1
}
