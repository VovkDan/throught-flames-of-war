import time
def coutdown():
    sec= int(inpu("Введіть кількість секунд"))
    while sec> 0 :
    mins, secs = divmod( sec, 60)
    timer = f'{mins:02}:{secs:02}
    print(timer,end='\r')
    time.sleep(1)
    sec-= 1
    print('Час вичерпаний')
