import math

def deg_to_rad(deg):
    return deg*math.pi/180

def distance(lat1, long1, lat2, long2):
    radius = 6371

    dlat = deg_to_rad(lat2 - lat1)
    dlong = deg_to_rad(long2 - long1)

    lat1 = deg_to_rad(lat1)
    lat2 = deg_to_rad(lat2)

    a = (math.sin(dlat/2)*math.sin(dlat/2)
            + math.sin(dlong/2) * math.sin(dlong/2) * math.cos(lat1) * math.cos(lat2))

    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1-a))
    return radius*c